/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const reportRoutes = require('./routes/reportRoutes');
const vulnerabilityRoutes = require('./routes/vulnerabilityRoutes');
const reportVulnerabilityRoutes = require('./routes/reportVulnerabilityRoutes');
const recommendations = require('./utils/recommendations');

const app = express();

// Middleware for handling CORS requests

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));
// Middleware for parsing JSON bodies

app.use(bodyParser.json());

// Route handling for different functionalities

app.use('/api/reports', reportRoutes);
app.use('/api/vulnerabilities', vulnerabilityRoutes);
app.use('/api/report-vulnerabilities', reportVulnerabilityRoutes);

const PORT = 5000;

// Setting up multer storage configuration


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage: storage });

// Function to run the Slither tool on uploaded contract file


function runSlither(file, callback) {
    const command = `slither ${file.path} --checklist > ./result.md`;
    exec(command, (error, stdout, stderr) => {
        if (stderr) {
            console.log("Slither stderr:", stderr);
        }
        if (error && !fs.existsSync('./result.md')) {
            callback(error, null);
            return;
        }
        callback(null, stdout);
        fs.unlinkSync(file.path);
    });
}

// API endpoint to upload and analyze contract file

app.post('/api/contracts/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    runSlither(file, async (error, stdout) => {
        if (error) {
            return res.status(500).send(`Error executing Slither command: ${error.message}`);
        }
        if (!fs.existsSync('./result.md')) {
            return res.status(500).send("Error: result.md not found!");
        }
        try {
            const data = fs.readFileSync('./result.md', 'utf8');

            const vulnerabilityPattern = /##\s*([\w-]+)\s*Impact:\s*(\w+)\s*Confidence:\s*(\w+)\s*(?:\s*- \[ \] ID-\d+\s*)?(.+?)\s*\[(.+?)\]\(([^)]+)\)/gs;     
            const matches = Array.from(data.matchAll(vulnerabilityPattern));
            const vulnerabilities = matches.map(match => ({
                type: match[1],
                impact: match[2],
                confidence: match[3],
                description: `${match[4]} [${match[5]}](${match[6]})`,
                location: /#L\d+(-L\d+)?/.exec(match[6])?.[0] || "Not specified"
            }));

            const report = await db.report.create({
                contract_name: file.originalname,
                audit_date: new Date(),
            });

            for (let vulnerability of vulnerabilities) {
                const createdVuln = await db.vulnerability.create({
                    vulnerability_name: vulnerability.type,
                    description: vulnerability.description,
                    impact: vulnerability.impact,
                    confidence: vulnerability.confidence,
                    location: vulnerability.location,
                    recommendation: recommendations[vulnerability.type] || "No recommendation found." 
                });
                        
                await db.reportVulnerabilities.create({
                    report_id: report.report_id,
                    vulnerability_id: createdVuln.vulnerability_id,
                });
            }
            res.status(200).send('File uploaded and analyzed successfully.');
        } catch (err) {
            res.status(500).send(`Error processing the Slither output: ${err.message}`);
        }
    });
});

// Default endpoint to check if the server is running

app.get('/', (req, res) => res.send('Hello from the backend!'));


// Database connection and server initialization

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        return db.sequelize.sync();
                        })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch(err => console.error('Unable to connect to the database:', err));


/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */


import React, { useState, useEffect } from 'react';
import axios from '../../api';
import { Container, Typography, Paper, Grid, Divider } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';

// Styling the Paper component to take the full height of the screen

const FullScreenPaper = styled(Paper)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem'
});

const Reports = () => {
        // State to hold the vulnerabilities fetched from the backend

    const [vulnerabilities, setVulnerabilities] = useState([]);
    // useEffect hook to fetch vulnerabilities when the component is mounted
    useEffect(() => {
        const newReportAvailable = localStorage.getItem('newReportAvailable');

        if (newReportAvailable === 'true') {
            axios.get('/api/vulnerabilities/latest')
                .then(response => {
                    setVulnerabilities(response.data);
                    localStorage.setItem('newReportAvailable', 'false');
                })
                .catch(error => {
                    console.error('Error fetching vulnerabilities:', error);
                });
        }

        return () => {
            setVulnerabilities([]);
        };
    }, []);

        // Function to extract contract name from the vulnerability description

    const extractContractName = description => {
        const match = description.match(/\[(\w+)\./);
        return match ? match[1] : "Not specified";
    };
    // Rendering the component

    return (
        <FullScreenPaper sx={{ backgroundColor: '#6BAA75', color: '#ffffff' }}>
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                Analysis Results
            </Typography>

            {vulnerabilities.length > 0 ? (
                vulnerabilities.map(vuln => (
                    <Paper key={vuln.vulnerability_id} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    <ErrorOutlineIcon color="secondary" /> Vulnerability Type: {vuln.vulnerability_name}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography><strong>Contract:</strong> {extractContractName(vuln.description)}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography><strong>Impact:</strong> {vuln.impact}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography><strong>Confidence:</strong> {vuln.confidence}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography><strong>Description:</strong> {vuln.description}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography><strong>Location:</strong> {vuln.location !== "Not specified" ? vuln.location : "The location is missing."}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography><strong>Recommendation:</strong> {vuln.recommendation || "No recommendation found."}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            ) : (
                <Typography align="center" style={{ marginTop: '20px' }}>
                    No results available at the moment. Please upload a Solidity file on the Audit page for analysis.
                </Typography>
            )}
        </Container>
        </FullScreenPaper>
    );
}

export default Reports;
/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Paper from '@mui/material/Paper';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Grid,Card, CardContent, CardActions } from '@mui/material';
import api from '../../api';
import { Link as RouterLink } from 'react-router-dom';

// Full Screen Paper component styling
const FullScreenPaper = styled(Paper)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem'
});

// Hidden styled input for file selection
const StyledInput = styled('input')({
    display: 'none'
});

const Audit = () => {
    // States to manage uploaded file, snackbar visibility, and error alert
    const [file, setFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.sol')) {
            setFile(selectedFile);
        } else {
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 5000); // Auto-hide the error alert after 3 seconds
        }
    };

    // Close handlers for alert and snackbar
    const handleClose = () => {
        setShowErrorAlert(false);
    };

    // Handle the file upload action
    const handleSubmit = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            // Sending the file to the backend
            api.post('/api/contracts/upload', formData)
                .then(response => {
                    setOpenSnackbar(true);
                    // Set a flag in the local storage to indicate that a new report is available
                    localStorage.setItem('newReportAvailable', 'true');
                })
                .catch(error => {
                    // Use error message from the backend if available, else use a default error message
                    const errorMessage = error.response?.data || "An unexpected error occurred.";
                    // Set the error message to the state (modify the state to hold the error message string)
                    setShowErrorAlert(errorMessage);
                    setTimeout(() => {
                        setShowErrorAlert(false);
                    }, 5000);
                });
        } else {
            setShowErrorAlert("Please select a valid Solidity (.sol) file.");
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 5000);
        }
    };
    
    return (
        <FullScreenPaper sx={{ backgroundColor: '#898952', color: '#ffffff' }}>
            <Container maxWidth="lg">
                <Box paddingBottom={3}>
                    <Typography variant="h4" gutterBottom>
                        Smart Contract Audit
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Upload your Solidity (.sol) file for comprehensive analysis. After choosing a file, please click upload for the analysis to start.
                    </Typography>
                </Box>

                {/* File Upload Section */}
                <Box paddingBottom={3}>
                    <Typography variant="h6" gutterBottom>
                        File Upload
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center">
                        <StyledInput
                            accept=".sol"
                            type="file"
                            onChange={handleFileChange}
                            id="contained-button-file"
                        />

                        {/* File picker button */}
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" startIcon={<AttachFileIcon />} component="span">
                                Choose File
                            </Button>
                        </label>

                        {/* Display selected file name and upload button */}
                        <Typography variant="body1" style={{ paddingRight: '10px' }}>
                            {file ? file.name : ""}
                        </Typography>
                        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleSubmit}>
                            Upload
                        </Button>
                    </Box>
                   
                    {/* Alert message for invalid file types */}
                    {showErrorAlert && (
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', marginTop: '1rem' }}>
                            {showErrorAlert}
                        </Alert>
                    )}
                </Box>

                {/* Call to Action */}
                <Grid container spacing={3} sx={{ marginTop: '3rem' }}>
                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{ backgroundColor: '#6D6875', padding: '2rem', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)' }}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                                    Ready to View Your Reports?
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#f5f5f5', marginTop: '1rem', fontSize: '1.1rem' }}>
                                Kindly allow a moment for the analysis to finish. Once done, click below to see the results of your smart contract audit.                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                                <Button variant="contained" color="primary" size="large" component={RouterLink} to="/Reports/Reports">
                                    View Reports
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                {/* Snackbar notification for successful file upload */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Analysis Complete"
                />
            </Container>
        </FullScreenPaper>
    );
}

export default Audit;

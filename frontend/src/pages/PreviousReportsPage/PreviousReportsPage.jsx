/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */


import React, { useState, useEffect } from 'react';
import axios from '../../api';
import { Container, Typography, Paper, Grid, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';



// Styling the Paper component to take the full height of the screen

const FullScreenPaper = styled(Paper)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem'
});



const PreviousReports = () => {
        // State to hold the reports fetched from the backend

    const [reports, setReports] = useState([]);
        // useEffect hook to fetch reports when the component is mounted


    useEffect(() => {
        fetchReports();
    }, []);

        // Function to fetch reports from the backend


            const fetchReports = async () => {
                try {
                    const response = await axios.get('/api/reports');
                    setReports(response.data);
                } catch (error) {
                    console.error("Error fetching reports:", error);
                }
            };

    // Function to format vulnerability name

            const formatVulnerabilityName = (name) => {
                return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            };

        // Function to view vulnerabilities associated with a specific report


                    const viewVulnerabilities = async (reportId) => {
                        try {
                            const response = await axios.get(`/api/report-vulnerabilities/report/${reportId}`);
                            const vulnerabilities = response.data;
                
                            console.log("Fetched vulnerabilities:", vulnerabilities);
                
                            if (vulnerabilities && vulnerabilities.length > 0) {
                                alert(vulnerabilities.map(v => {
                                    if (v?.vulnerability_name && v?.recommendation) {
                                        return `${formatVulnerabilityName(v.vulnerability_name)}: ${v.recommendation}`;
                                    } else {
                                        return "Incomplete data for a vulnerability.";
                                    }
                                }).join("\n"));
                            } else {
                                alert("No vulnerabilities found for this report.");
                            }
                        } catch (error) {
                            console.error("Error fetching vulnerabilities for report:", error);
                            alert("An error occurred while fetching vulnerabilities.");
                        }
                    };

                    return (
                        <FullScreenPaper sx={{ backgroundColor: '#D58936', color: '#ffffff' }}>
                        <Container>
                            <Typography variant="h4" gutterBottom align="center">
                                Previous Reports
                            </Typography>

                            {reports.length > 0 ? (
                                reports.map(report => (
                                    <Paper key={report.report_id} style={{ padding: '20px', marginBottom: '20px' }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5">
                                                    {report.contract_name}
                                                </Typography>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography><strong>Report Date:</strong> {new Date(report.audit_date).toLocaleDateString()}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Button variant="outlined" color="primary" onClick={() => viewVulnerabilities(report.report_id)}>
                                                    View Vulnerabilities
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))
                            ) : (
                                <Typography align="center" style={{ marginTop: '20px' }}>
                                    No previous reports found. Please upload a Solidity file for analysis.
                                </Typography>
                            )}
                        </Container>
                        </FullScreenPaper>

    );
}

export default PreviousReports;

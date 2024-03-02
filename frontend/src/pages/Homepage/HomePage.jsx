/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */


import React from 'react';
import { Grid, Container, Typography, Box, Button, Card, CardActions, CardContent } from '@mui/material';
import {  Start as StartIcon,  } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';



        const Homepage = () => {
            return (
                <Container maxWidth="lg">
                    <Box padding={3}>

                    {/* Main grid container */}
                        <Grid container spacing={3}>
                            
                            {/* Image section */}
                            <Grid item xs={12} md={6}>
                                <img 
                                    src="https://images.pexels.com/photos/7267598/pexels-photo-7267598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Smart Contract Audit Visualization" 
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Grid>


                    {/* Text description next to image */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            Smart Contract Audit System
                        </Typography>
                        <Typography variant="body1" paragraph>
                        Smart Contract Audit System employs cutting-edge automated techniques, fortified by a robust underlying framework, to swiftly pinpoint vulnerabilities in smart contracts. Contrasting traditional manual strategies, where each line of code is scrupulously examined by human experts, our system is powered by specialized vulnerability detection algorithms. This not only accelerates the auditing process but is also particularly advantageous for projects racing against the clock. However, it's pivotal to understand that while automation offers speed, it might not always capture the nuanced intricacies akin to a human reviewer. Our framework's automated testing phase comprises crafting meticulous test scripts for comprehensive scrutiny, striking the optimal equilibrium between the precision of manual insight and the velocity of automation       </Typography>
                         </Grid>
                        </Grid>


                {/* Features section */}
                <Grid container spacing={3} sx={{ marginTop: '3rem' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Our Main Features
                        </Typography>
                    </Grid>

                    {/* Feature 1 */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Advanced Vulnerability Detection
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our system detects vulnerable Solidity code with precision, minimizing false positives. It pinpoints error conditions directly in the source code, streamlining the auditing process.
                        </Typography>
                        
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Comprehensive Analysis & Reporting
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Enjoy high-quality audit reports detailing every facet of the analysis. With an average execution time of under a second per contract, our system efficiently integrates into continuous integration builds.
                        </Typography>
                    
                    </Grid>
                </Grid>
                
                {/* Call to Action */}
                <Grid container spacing={3} sx={{ marginTop: '3rem' }}>
                <Grid item xs={12}>
                <Card variant="outlined" sx={{ backgroundColor: '#984447', padding: '2rem', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                            Ready to Secure Your Smart Contract?
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#f5f5f5', marginTop: '1rem', fontSize: '1.1rem' }}>
                            Ensure the safety and security of your smart contract with our comprehensive audit services. Get started now!
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                        <Button variant="contained" color="primary" size="large" endIcon={<StartIcon />} component={RouterLink} to="/Audit/Audit">
                            Start Audit
                        </Button>
                            </CardActions>
                            </Card>
                                </Grid>
                                </Grid>
                                </Box>
                            </Container>
                        );
                    }
                export default Homepage;

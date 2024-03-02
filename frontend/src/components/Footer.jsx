/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */


import React from 'react';
import { Container, Typography, } from '@mui/material';

// The Footer component is defined using an arrow function.
const Footer = () => (
    <footer className="footer">

         {/* Container ensures the content remains within a central area. */}
        <Container maxWidth="lg">
            <Typography variant="h6" gutterBottom>
                Smart Contract Audit System
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Advanced automated auditing for smart contracts.
            </Typography>

            {/* Dynamic year is inserted using JavaScript's Date object. */}
            <Typography variant="body2" color="textSecondary" component="p">
                © {new Date().getFullYear()}  Group (2-43)Inc. All rights reserved.
            </Typography>
         
        </Container>
    </footer>
);
export default Footer;

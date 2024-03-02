/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */
import * as React from 'react';
import {  Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function Searchbar() {

    return (

        // Box acts as a wrapper to ensure the AppBar takes full width of its container.
        <Box sx={{ flexGrow: 1 }}>

            {/* AppBar represents the top bar. "position" prop is set to "static" which means the AppBar doesn't stay fixed when scrolling. 
            A custom background color is also assigned. */}
            
            <AppBar position="static" style={{ backgroundColor: '#6883BA' }}> 

                 {/* Toolbar contains the actual content of the AppBar. */}
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Smart Contract Audit
                    </Typography>

                    {/* Each Button acts as a link (thanks to the "component" prop that makes them work as React Router Links). 
                    They navigate to different routes in the application. */}

                    <Button color="inherit" component={RouterLink} to="/Homepage/HomePage">Home</Button>
                    <Button color="inherit" component={RouterLink} to="/Audit/Audit">Audit</Button>
                    <Button color="inherit" component={RouterLink} to="/Reports/Reports">Reports</Button>
                    <Button color="inherit" component={RouterLink} to="/PreviousReportsPage/PreviousReportsPage">Previous Reports</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

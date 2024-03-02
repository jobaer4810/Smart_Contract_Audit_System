/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */

import React from 'react';
import Homepage from './pages/Homepage/HomePage';
import Audit from './pages/Audit/Audit';
import Reports from './pages/Reports/Reports';
import PreviousReportsPage from './pages/PreviousReportsPage/PreviousReportsPage';
import Container from '@mui/material/Container';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import './App.css';
import {  CssBaseline,Paper, createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function App() {
    const theme = createTheme({
        palette: {
            mode:"dark",
            primary: {
            main : blue[500],
            contrastText: '#fff',
          },
          },
        });
    return (
        <Router>
            <div className="App">
            <CssBaseline />
            {/* Top search bar component */}
                <Searchbar /> 
                {/* Main app theme provider with custom theme */}
                <ThemeProvider theme={theme}>
                    {/* Central content container */}
                    <Paper variant="outlined" style={{ margin: '0 auto', maxWidth: 'lg', padding: '1rem' }}>
                        <Container style={{ paddingTop: 64 }}>
                            {/* Main routing for the application */}
                            <Routes>
                                <Route path="/" element={<Navigate to="/Homepage/HomePage" />} />
                                <Route path="/Homepage/Homepage" element={<Homepage />} />
                                <Route path="/Audit/Audit" element={<Audit />} />
                                <Route path="/Reports/Reports" element={<Reports />} />
                                <Route path="/PreviousReportsPage/PreviousReportsPage" element={<PreviousReportsPage />} />
                            </Routes>
                        </Container>
                    </Paper>
                </ThemeProvider>
                {/* Footer component */}
                <Footer />
            </div>
        </Router>
    );
}
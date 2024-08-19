import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IdCard from '../images/IdCard.png';
import {
    Button, TextField, Grid, Typography, Container, Box, Link, Checkbox, FormControlLabel
} from '@mui/material';

const GoogleIconSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        aria-hidden="true"
    >
        <path fill="#4285F4" d="M24 9.5c3.02 0 5.64 1.03 7.74 2.73l5.67-5.68C33.53 3.57 29.07 2 24 2 14.79 2 7.14 7.65 4.22 15.39l6.98 5.45C12.63 14.14 17.87 9.5 24 9.5z" />
        <path fill="#34A853" d="M46.7 24.62c0-1.54-.14-3.02-.41-4.46H24v8.45h12.79c-.56 2.85-2.23 5.25-4.73 6.86l7.44 5.81c4.34-4 6.8-9.91 6.8-16.66z" />
        <path fill="#FBBC05" d="M11.2 27.32c-.6-1.53-.95-3.16-.95-4.82s.35-3.29.95-4.82l-6.98-5.45C2.59 15.49 1.85 18.17 1.85 21s.74 5.51 2.37 7.78l6.98-5.46z" />
        <path fill="#EA4335" d="M24 44c5.42 0 10.02-1.79 13.36-4.86l-7.44-5.81c-2.08 1.39-4.7 2.22-7.63 2.22-6.13 0-11.37-4.64-12.81-10.74l-6.98 5.45C7.14 40.35 14.79 46 24 46z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
);

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const location = useLocation();
    const handleLoginClick = (role) => {
        if (location.pathname.includes('/admin')) 
        onLogin('admin');  
        else if (location.pathname.includes('/entry')) 
        onLogin('Entry');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            email,
            password,
            rememberMe,
        });

        // Call handleLoginClick with a role based on some logic or user input
        handleLoginClick('admin'); // or 'entry'
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            disableGutters
            sx={{
                fontFamily: "'Montserrat', sans-serif",
                display: 'flex',
                height: '100vh',
                flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
            }}
        >
            <Helmet>
                <title>Egate Management System</title>
            </Helmet>

            {/* Left Sidebar */}
            <Box
                sx={{
                    width: { xs: '100%', md: '55%' }, // Responsive width
                    background: 'linear-gradient(240deg, #fcaf08 25%, #CA6A00 100%)',
                    display: 'flex',
                    boxShadow: '3px 4px 5px 1px rgba(0,0,0,0.3)',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    clipPath: { xs: 'none', md: 'polygon(0% 0%, 100% 0%, 67% 20%, 0% 100%)' },
                }}
            >
                {/* Add any additional content here */}
            </Box>

            {/* Right Login Box */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    position: "absolute",
                    top: '12%',
                    left: '5%',
                    bottom: '50%',
                    width: "48%",
                }}
            >
                <Box
                    component="img"
                    src={IdCard}
                    alt="ID Card Image"
                    sx={{
                        width: '50%',
                        height: 'auto',
                        marginLeft: '-32.7%',
                        marginBottom: 2, 
                    }}
                />

                <Typography
                    variant="h1"
                    sx={{
                        background: 'linear-gradient(240deg,#fcaf08 0%, #154E5D 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        fontSize: { xs: 24, md: 46 },
                        textAlign: 'left',
                        margin: 2,
                        marginLeft: -5,
                    }}
                >
                    E-Gate Management System
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                        color: 'black',
                        fontSize: 18,
                        textAlign: 'left',
                        marginLeft: 5,
                    }}
                >
                    Welcome to the E-Gate Management System. This system is designed to manage and track the entry
                    and exit of Students and Faculties. It provides a secure and efficient
                    way to manage access and monitor activity.
                </Typography>
            </Box>

            <Box
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    marginRight: { xs: 0, md: 5 },
                    width: { xs: '100%', md: '45%' }, // Responsive width
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img
                            src="https://kce.ac.in/new/wp-content/uploads/2022/12/logo-grade-kce-2.png"
                            alt="KCE Logo"
                            style={{ maxHeight: 150 }}
                        />
                    </Box>
                    <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 2 }}>
                        Log in to your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                padding: '8px',
                                borderRadius: '4px',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#388E3C',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIconSVG />}
                        sx={{
                            mt: 2,
                            borderColor: '#4285F4',
                            color: '#4285F4',
                            '&:hover': {
                                borderColor: '#357AE8',
                                color: '#357AE8',
                            },
                        }}
                    >
                        Continue with Google
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

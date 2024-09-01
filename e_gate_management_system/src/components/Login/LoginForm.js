import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Link, Typography } from '@mui/material';
import GoogleIconSVG from './GoogleIconSVG';

const LoginForm = ({ onSubmit, onForgotPassword, email, setEmail, password, setPassword, loading }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setIsButtonDisabled(!(email && password));
        setShowWarning(false);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
            onSubmit();
        }
    };

    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: 2,
                marginRight: { xs: 0, md: 5 },
                width: { xs: '100%', md: '45%' },
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
                {showWarning && (
                    <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ mt: 1 }}
                    >
                        Please fill in both fields to sign in.
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        InputLabelProps={{
                            sx: {
                               backgroundColor:'transparent',
                                padding: '0 5px', 
                                zIndex:1,
                            },
                        }}
                        onChange={handleInputChange(setEmail)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        InputLabelProps={{
                            sx: {
                               
                                padding: '0 5px', 
                                zIndex:1,
                            },
                        }}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleInputChange(setPassword)}
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
                                backgroundColor: '#45A049',
                            },
                            fontFamily: "'Montserrat', sans-serif",
                            fontStretch: "extra-expanded",
                            fontSize: "1rem",
                        }}
                    >
                        {loading ? ("Signing In ....") : ("Sign In")}


                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={onForgotPassword}
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    letterSpacing: '0.005em',
                                    textAlign: "end",
                                    display: "block",
                                    paddingRight: "2rem",
                                    fontWeight: 500
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                {/* Custom Divider */}
                <Box sx={{ my: 2, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Box sx={{ flexGrow: 1, borderBottom: '2px solid #ddd', borderColor: '#ddd', mx: 2 }} />
                    <Typography variant="body2" color="textSecondary" sx={{
                        mx: 2, fontFamily: "'Montserrat', sans-serif",
                        fontStretch: "extra-expanded",
                        fontSize: "1.2rem"
                    }}>
                        or
                    </Typography>
                    <Box sx={{ flexGrow: 1, borderBottom: '2px solid #ddd', borderColor: '#ddd', mx: 2 }} />
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
                        fontFamily: "'Montserrat', sans-serif",

                        fontSize: "1rem",
                    }}
                >
                    Continue with Google
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;

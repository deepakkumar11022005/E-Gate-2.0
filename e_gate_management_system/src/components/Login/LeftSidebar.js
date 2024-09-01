// components/LeftSidebar.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import IdCard from '../../images/IdCard.png';

const LeftSidebar = () => (
    <Box
        sx={{
            width: { xs: '100%', md: '55%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            padding: 4,
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        {/* Background Layer */}
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(240deg, #fcaf08 25%, #CA6A00 100%)',
                clipPath: { xs: 'none', md: 'polygon(0% 0%, 100% 0%, 67% 20%, 0% 100%)' },
                // zIndex: 1,  
                boxShadow: '3px 4px 5px 1px rgba(0,0,0,0.3)',
            }}
        />

        {/* ID Card Image */}
        <Box
            component="img"
            src={IdCard}
            alt="ID Card Image"
            sx={{
                width: '50%',
                height: 'auto',
                marginBottom: 2,
                position: 'relative',
                // zIndex: 1, 
               
                
            }}
        />

        {/* E-Gate Management System Text */}
        <Typography
            variant="h1"
            sx={{
                background: 'linear-gradient(240deg,#fcaf08 0%, #154E5D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: { xs: 24, md: 46 },
                textAlign: { xs: 'center', md: 'left' },
                marginX: { xs: 2, md: 0 },
                marginY: 2,
                fontFamily: "'Montserrat', sans-serif",
                fontStretch: "extra-expanded",
                position: 'relative',
                // zIndex: 2,  
            }}
        >
            E-Gate Management System
        </Typography>

        {/* Description Text */}
        <Typography
            variant="h6"
            sx={{
                fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                color: 'black',
                fontSize: { xs: 16, md: 18 },
                textAlign: { xs: 'center', md: 'left' },
                marginX: { xs: 2, md: 2 },
                marginBottom: -10, // Adding marginBottom to push the text 100px down
                position: 'relative',
                zIndex: 2,  
            }}
        >
            Welcome to the E-Gate Management System. This system is designed to manage and track the entry
            and exit of Students and Faculties. It provides a secure and efficient
            way to manage access and monitor activity.
        </Typography>
    </Box>
);

export default LeftSidebar;

// components/LeftSidebar.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import IdCard from '../../images/IdCard.png';

const LeftSidebar = () => (
    <Box
        sx={{
            width: { xs: '100%', md: '55%' },
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
        {/* ID Card Image */}
        <Box
            component="img"
            src={IdCard}
            alt="ID Card Image"
            sx={{
                width: '50%',
                height: 'auto',
                // marginLeft: '2.7%',
                marginBottom: 2,
                position: 'relative',
                zIndex: 2,  
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
                textAlign: 'left',
                margin: 2,
                marginLeft: -5,
                fontFamily: "'Montserrat', sans-serif",
                fontStretch: "extra-expanded",
                fontSize: "2.5rem",
                position: 'relative',
                zIndex: 2,  
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
                fontSize: 18,
                textAlign: 'left',
                marginLeft: 5,
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

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Loader({ showLoader }) {
    if (!showLoader) return null; // Don't render anything if showLoader is false

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 11000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // 40% transparent white background
                backdropFilter: 'blur(5px)', // Subtle blur effect
            }}
        >
            <CircularProgress />
            <Typography 
                variant="h8" 
                sx={{ marginTop: 2, color: '#333', fontWeight: 'bold' }}
            >
                ⏳ Please wait, this may take a moment...
            </Typography>
        </Box>
    );
}

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ phoneNumber: '', password: '', confirmPassword: '' });
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            const numericValue = value.replace(/[^0-9]/g, "");
            setFormData({ ...formData, [name]: numericValue });
            setPhoneError(numericValue.length === 10 ? "" : "Phone number should be 10 digits");
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleResetPassword = async () => {
        setShowLoader(true);
        try {
            const response = await axios.post('https://pickle-backend-2xil.onrender.com/api/v1/forgot-password', formData);
            setShowLoader(false);
            setMessage(response.data.message || 'Password reset successful');
            setError('');
            navigate('/login');
        } catch (error) {
            setShowLoader(false);
            setError(error.response?.data?.message || 'Password reset failed, please try again.');
            setMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phoneError || !formData.phoneNumber || !formData.password || !formData.confirmPassword) return;
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        handleResetPassword();
    };

    return (
        <>
            <Loader showLoader={showLoader} />
            <Container component="main" maxWidth="xs">
                <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" component="h1">
                        Forgot Password
                    </Typography>
                    {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }}
                            InputProps={{ sx: { borderRadius: '12px' } }}
                        />
                        {phoneError && <Alert severity="error" sx={{ mt: 1 }}>{phoneError}</Alert>}
                        
                        <TextField
                            margin="normal"
                            fullWidth
                            label="New Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: '12px' } }}
                        />
                        
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: '12px' } }}
                        />
                        {passwordError && <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>}
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: 1.5, borderRadius: '12px', fontWeight: 'bold', textTransform: 'none' }}
                        >
                            Reset Password
                        </Button>
                    </Box>
                    <Typography variant="body2" align="center" color="text.secondary">
                        Remember your password?
                        <a onClick={() => navigate('/login')} style={{ marginLeft: 5, color: 'primary.main', cursor: 'pointer' }}>Log in</a>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default ForgotPassword;

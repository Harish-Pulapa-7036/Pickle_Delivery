import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Login = () => {
    const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
    const navigate = useNavigate();
    const [phoneError, setPhoneError] = useState('');
    const [showLoader,setShowLoader]=useState(false)
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            // Allow only digits
            const numericValue = value.replace(/[^0-9]/g, "");  // Remove anything that's not a digit

            setFormData({ ...formData, [name]: numericValue });

            // Validation for 10 digits
            if (numericValue.length === 10) {
                setPhoneError(""); // No error if exactly 10 digits
            } else {
                setPhoneError("Phone number should be 10 digits");
            }
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSignin = async () => {
        setShowLoader(true)
        try {
            const response = await axios.post('https://pickle-backend-2xil.onrender.com/api/v1/signin', {
                phoneNumber: formData.phoneNumber,
                password: formData.password,
               
            });
            const token = response.data.token;
            setShowLoader(false)
            // ✅ Store token in sessionStorage
            sessionStorage.setItem('token', token);
            // Handle success (e.g., show a message, redirect, etc.)
            alert('Signin successful!');
            navigate('/');  
        } catch (error) {
            console.error('Signup failed', error.response?.data || error.message);
            setShowLoader(false)
            // Handle error (e.g., show error message to user)
            alert(error.response?.data?.message || 'Signup failed, please try again.');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if( phoneError || 
            formData.password.length === 0 || 
            formData.phoneNumber.length === 0
        ) return
        else {
            handleSignin()
        }
        console.log('Form Data:', formData);
        // Add your form submission logic here
    };
    const handleSignup = () => {
        navigate('/signup');  // Navigate to login page
    };
    return (
        <>
        <Container component="main" maxWidth="xs" style={{ maxHeight: "70vh" }} className="invisibleScroller">
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                    Sign In
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        type="text"  // Change to text
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        inputProps={{
                            maxLength: 10,  // Optional, to limit to 10 digits
                            inputMode: "numeric",  // Show numeric keyboard on mobile
                            pattern: "[0-9]*"  // Helps some browsers restrict input
                        }}
                        InputProps={{ sx: { borderRadius: '12px' } }}
                    />

                    {phoneError && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {phoneError}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: '12px' } }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            p: 1.5,
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}
                    >
                        Sign In
                    </Button>
                    
                </Box>
                <Link to="/forgot-password" style={{ color: '#1976d2', textDecoration: 'none' }}>
        Forgot Password
    </Link>
                <Typography variant="body2" color="text.secondary">
                    Don’t have an account?
                    <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
        Sign Up
    </Link>
                </Typography>
            </Paper>
        </Container>
        <Loader showLoader={showLoader}/>
        </>
    );
};

export default Login;

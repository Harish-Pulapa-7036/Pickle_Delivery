import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    TextField, 
    Button, 
    Container, 
    Paper, 
    Typography, 
    Box, 
    Avatar, 
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import Loader from "../components/Loader";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const [phoneError, setPhoneError] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "phoneNumber") {
            const numericValue = value.replace(/[^0-9]/g, "");  
            setFormData({ ...formData, [name]: numericValue });
    
            if (numericValue.length === 10) {
                setPhoneError("");
            } else {
                setPhoneError("Phone number should be 10 digits");
            }
        } else if (name === "confirmPassword") {
            setFormData({ ...formData, [name]: value });
            setError(formData.password === value ? '' : "Passwords do not match");
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSignup = async () => {
        setShowLoader(true);
        try {
            const response = await axios.post('https://pickle-backend-2xil.onrender.com/api/v1/signup', formData);
            setShowLoader(false);
            setMessage('Signup successful!');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error.response?.data || error.message);
            setShowLoader(false);
            setError(error.response?.data?.message || 'Signup failed, please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error || phoneError || Object.values(formData).some(value => value.length === 0)) return;
        handleSignup();
    };

    return (
        <>
            <Container component="main" maxWidth="xs" className="invisibleScroller">
                <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">Signup</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required margin="normal" />
                        <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required margin="normal" inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }} />
                        {phoneError && <Alert severity="error" sx={{ mt: 1 }}>{phoneError}</Alert>}
                        <TextField fullWidth label="Address" name="address" multiline rows={3} value={formData.address} onChange={handleChange} required margin="normal" />
                        <TextField fullWidth label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required margin="normal" InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ) }} />
                        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required margin="normal" />
                        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ mt: 1 }}>{message}</Alert>}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>Signup</Button>
                        <Typography variant="body2" align="center">Already have an account? <Button color="primary" onClick={() => navigate('/login')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>Login</Button></Typography>
                    </Box>
                </Paper>
            </Container>
            <Loader showLoader={showLoader} />
        </>
    );
};

export default Signup;

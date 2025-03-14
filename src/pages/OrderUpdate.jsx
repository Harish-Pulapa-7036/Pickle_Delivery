import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const OrderUpdate = () => {
    const [orderId, setOrderId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.put(
                `https://pickle-backend-2xil.onrender.com/api/v1/pickle/update-order-status/${orderId}`,
                { phoneNumber },
                {
                    headers: {
                       token:sessionStorage.getItem('token')
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "white",
            }}
        >
            <Typography variant="h5" gutterBottom>
                Update Order Status
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Order ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <TextField
                    label="Admin Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Update Order
                </Button>
            </form>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
    );
};

export default OrderUpdate;

import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Collapse, IconButton, List, ListItem, ListItemText, Divider, Box, Container, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', mt: 2, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                    🛒 Order #{order.orderId} - {order.orderStatus}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight="bold">
                        Items Summary
                    </Typography>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>

                <Collapse in={expanded}>
                    <List>
                        {order.orders.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText primary={`${item.productName} (Qty:${item.quantity},Wt:${item.weight})`} />
                                    <Typography variant="body2" fontWeight="bold">{`₹${item.actualPrice}`}</Typography>
                                </ListItem>
                                {index < order.orders.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" textAlign="right">
                    Total: <strong>₹{order.totalPrice}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
};

const OrdersList = ({ ordersList }) => {
    const navigate = useNavigate();
    return (
        ordersList?.length ? <Container>
            <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
                My Orders
            </Typography>
            <Grid container spacing={2} sx={{ maxHeight: "70vh" }} className='invisibleScroller'>
                {ordersList?.length && ordersList.map(order => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <OrderCard order={order} />
                    </Grid>
                ))
                }
            </Grid>

        </Container>

            : <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
            >
                <Typography variant="h3"  className="cart-text" 
               sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
               }}
                >
                Your cart feels lonely... 🛒💨 

                </Typography>
                <Typography variant="h3" p={4} className="cart-text" 
               sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
               }}
                >
               Place an order to make it happy! 😊

                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => navigate('/')}
                >
                    Continue Shopping
                </Button>
            </Box>
    );
};

export default OrdersList;

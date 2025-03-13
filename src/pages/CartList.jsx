import { Button, Card, Box, CardActions, CardContent, CardMedia, IconButton, ToggleButton, Typography, ToggleButtonGroup } from "@mui/material";
import "./CartList.css"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OrderPopup from "../components/OrderPopup";
import { useNavigate } from "react-router-dom";
import { getImageSrcByName } from "../imageHelper";
const CartItem = ({ item, handleQuantityOrWeight, handleDeleteCartItem }) => {
    const [selectedWeight, setSelectedWeight] = useState('250gms');
    const [quantity, setQuantity] = useState(1);

    // const handleWeightChange = (event, newWeight) => {
    //     if (newWeight !== null) {
    //         setSelectedWeight(newWeight);
    //     }
    // };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
    // productName:productName,
    // pricePerKg:pricePerKg,
    // weight:"1000g",
    // quantity:1
    return <>
        <Card sx={{ border: "3px solid white", fontFamily: 'Poppins, sans-serif', borderRadius: "20px" }}>
            <CardContent style={{
                display: "flex",
                marginLeft: "8px",
                

            }}>
                <CardMedia
                    sx={{ width: "100px", height: "80px" ,objectFit: "cover"}}
                    image={getImageSrcByName(item.productName)}
                    title="Mango Pickle"
                />
                <CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {item.productName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {item.pricePerKg}
                    </Typography>
                </CardContent>
            </CardContent>
            <CardContent>
                <Typography
                    style={{
                        display: "inline-flex",
                        alignItems: 'center',
                        backgroundColor: "#e9e3e3",
                        alignSelf: "flex-start",
                        fontFamily: 'Poppins, sans-serif',
                        marginLeft: "8px"
                    }}
                >
                    <Button size="small" onClick={(e) => handleQuantityOrWeight(e, item, "decrement")}>-</Button>
                    <Typography sx={{ fontWeight: 500 }}>{item.quantity}</Typography>
                    <Button size="small" onClick={(e, newWeight) => handleQuantityOrWeight(e, item, "increment", newWeight)}>+</Button>
                </Typography>
                <CardActions>
                    {/* Weight Options */}
                    <ToggleButtonGroup
                        value={item.weight}
                        exclusive
                        onChange={(e) => handleQuantityOrWeight(e, item, "weight")}
                        aria-label="weight selection"
                        size="small"
                        sx={{ fontFamily: 'Poppins, sans-serif', paddingLeft: "0px" }}
                    >
                        <ToggleButton value="250gms">250gms</ToggleButton>
                        <ToggleButton value="500gms">500gms</ToggleButton>
                        <ToggleButton value="750gms">750gms</ToggleButton>
                        <ToggleButton value="1kg">1kg</ToggleButton>
                    </ToggleButtonGroup>

                    {/* Delete Button */}
                    <div onClick={() => handleDeleteCartItem(item._id)}>
                        <IconButton size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    </>

}
const CartList = ({ cartItems, handleQuantityOrWeight, handleDeleteCartItem, totalPrice,placeOrder }) => {
    // Function to handle order placement
    
        const navigate = useNavigate();
    
 
    return (
        <>
            <div style={{ maxHeight: "70vh", marginBottom:"4rem",boxSizing:"border-box" }} className="cartList-container invisibleScroller">

                {
                    cartItems && cartItems?.length ?
                        cartItems.map((item) =>
                            <CartItem
                                item={item}
                                handleQuantityOrWeight={handleQuantityOrWeight}
                                handleDeleteCartItem={handleDeleteCartItem}
                            />
                        ) :   <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={4}
                      >
                        <Typography variant="h3" p={4} className="cart-text">
                          Cart items are empty 😔 
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
                }


            </div>
            {/* Sticky Total Bar */}
            {
                cartItems && cartItems?.length ? 
                <div className="cartTotalBar">
                <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>

                    <Typography variant="h7" sx={{ color: 'white' }}>
                        Total
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                        {`Rs ${totalPrice}`}
                    </Typography>
                </div>

                <Button size="large"
                    sx={{
                        background: 'green', color: "white", '&:hover': {
                            backgroundColor: "#0056b3",  // Keep white on hover
                            color: "white"             // Optional - keep text color
                        }
                    }}
                    onClick={placeOrder}
                >
                    place order
                </Button>

            </div>
                : null
            }
            
        </>
    )
}
export default CartList;

import React, { useEffect, useState } from 'react';
import './PickleList.css';  // Importing the external CSS
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const PickleCard = ({ image, name, price, onAddToCart }) => (
    <div className="pickle-card">
        <img src={image} alt={name} className="pickle-image" />
        <h3 className="pickle-name">{name}</h3>
        <p className="pickle-price">₹{price}</p>
        <button className="add-to-cart-btn" onClick={onAddToCart}>
            <div style={{ width: '12px', height: '12px' }}>
                <ShoppingCartIcon style={{ width: '100%', height: '100%' }} />
            </div>
            Add to Cart
        </button>
    </div>
);
// const pickles = [
//     { image: '/images/mango-pickle.jpg', name: 'Mango Pickle', price: 150 },
//     { image: '/images/mango-pickle.jpg', name: 'Lemon Pickle', price: 120 },
//     { image: '/images/mango-pickle.jpg', name: 'Garlic Pickle', price: 180 },
//     { image: '/images/mango-pickle.jpg', name: 'Mixed Pickle', price: 200 },   
//     { image: '/images/mango-pickle.jpg', name: 'Mango Pickle', price: 150 },
//     { image: '/images/mango-pickle.jpg', name: 'Lemon Pickle', price: 120 },
//     { image: '/images/mango-pickle.jpg', name: 'Garlic Pickle', price: 180 },
//     { image: '/images/mango-pickle.jpg', name: 'Mixed Pickle', price: 200 },   
//     { image: '/images/mango-pickle.jpg', name: 'Mango Pickle', price: 150 },
//     { image: '/images/mango-pickle.jpg', name: 'Lemon Pickle', price: 120 },
//     { image: '/images/mango-pickle.jpg', name: 'Garlic Pickle', price: 180 },
//     { image: '/images/mango-pickle.jpg', name: 'Mixed Pickle', price: 200 },   
//      { image: '/images/mango-pickle.jpg', name: 'Mango Pickle', price: 150 },
//     { image: '/images/mango-pickle.jpg', name: 'Lemon Pickle', price: 120 },
//     { image: '/images/mango-pickle.jpg', name: 'Garlic Pickle', price: 180 },
//     { image: '/images/mango-pickle.jpg', name: 'Mixed Pickle', price: 200 },
// ];
const vegPickles = [
    { image: '/images/gongura_pickle.webp', name: 'Gongura Pickle', price: 700 },
    { image: '/images/ginger_pickle.webp', name: 'Ginger(Allam) Pickle', price: 750 },
    { image: '/images/corriander_pickle.webp', name: 'Kothimeera Pickle', price: 700 },
    { image: '/images/mango_pickle.webp', name: 'Mango Pickle', price: 750 },
    { image: '/images/lemon_pickle.webp', name: 'Lemon Pickle', price: 700 },
    { image: '/images/red chillie_pickle.webp', name: 'PanduMirchi Pickle', price: 700 },
     { image: '/images/pudina_pickle.webp', name: 'Pudhina Pickle', price: 750 },
    { image: '/images/tomato_pickle.webp', name: 'Tomato Pickle', price: 700 },
    { image: '/images/amla_pickle.webp', name: 'UsiriKaya(Amla) Pickle', price: 800 },
];

const nonVegPickles = [
    { image: '/images/chicken_pickle.webp', name: 'Chicken Pickle(Bone)', price: 1150 },
    { image: '/images/chicken_pickle.webp', name: 'Chicken Pickle(BoneLess)', price: 1450 },
    { image: '/images/chicken_pickle.webp', name: 'Chicken Gongura Pickle', price: 1350 },
    { image: '/images/mutton_pickle.webp', name: 'Mutton Pickle(Bone)', price: 1850 },
    { image: '/images/mutton_boneless_pickle.webp', name: 'Mutton Pickle(BoneLess)', price: 2200 },
    { image: '/images/mutton_boneless_pickle.webp', name: 'Mutton Gongura Pickle(BoneLess)', price: 2100 },
    { image: '/images/prawns_pickle.webp', name: 'Prawns Pickle', price: 2000 },
     { image: '/images/prawns_gongura_pickle.webp', name: 'Prawns Gongura Pickle', price: 2050 },
    { image: '/images/fish_pickle.webp', name: 'Fish Pickle', price: 1300 },
    { image: '/images/fish_pickle.webp', name: 'Koramenu Fish Pickle', price: 1500 },
];


const PickleList = ({onAddToCart}) => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate()
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    const handleCheckOutClick=()=>{
        navigate('/cart')
    }

    const pickles = tabIndex === 0 ? vegPickles : nonVegPickles;
    return (
        <Box className="pickle-tabs-container " sx={{ width: "100%", position: "relative" }} >
            <Tabs value={tabIndex} onChange={handleTabChange} centered
                // sx={{
                //     '& .MuiTab-root': {
                //         color: 'white',              // Inactive Tab color
                //         textTransform: 'none', 
                //         // background:"#121826",
                //         margin: "1rem 0", 
                //     },
                //     '& .Mui-selected': {
                //         color: 'white',              // Active Tab color
                //         fontWeight: 'bold', 
                //                 // Optional: make selected bold
                //     },
                //         borderRadius:" 0.5rem",
                //         margin: "20px",
                //     background:"#121826",      // Background color for the tab bar
                // }}
                sx={{
                    height: "60px",  // Set height for the entire tabs bar
                    minHeight: "60px", // Ensures it doesn't shrink
                    background: "#121826",  // Background color for tab bar
                    borderRadius: "0.5rem",
                    margin: "20px",
                    marginTop: "40px",
                    '& .MuiTab-root': {
                        color: 'white',
                        textTransform: 'none',
                        margin: "0.5rem 1rem",
                        minHeight: "50px",  // Set height for each tab
                        height: "50px",    // Ensures each tab button keeps this height
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& .Mui-selected': {
                        color: 'white',
                        fontWeight: 'bold',
                    }
                }}
            >
                <Tab label="Veg Pickles" />
                <Tab label="Non-Veg Pickles" />
            </Tabs>
            <div className="pickle-list-container invisibleScroller" style={{ maxHeight: "70vh", }}>
                {pickles.map((pickle, index) => (
                    <PickleCard
                        key={index}
                        image={pickle.image}
                        name={pickle.name}
                        price={pickle.price}
                        onAddToCart={()=>{onAddToCart(pickle.name,pickle.price)}}
                    />
                ))}

            </div>
        </Box>
    );
};

export default PickleList;

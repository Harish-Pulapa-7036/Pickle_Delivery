import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from "framer-motion";
const HeaderText = () => {
    const navigate = useNavigate();

    return (
        <h1
            onClick={() => navigate("/")}
            className="logo-heading"
        >
            <img src={'/images/logo-pickle.jpeg'} alt="PP Logo" className="logo" />
            Padmaja Pickles
        </h1>
    );
};


const Header = ({ cartCount }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const token = sessionStorage.getItem("token")
    const phoneNumber = sessionStorage.getItem("phoneNumber")
    // Close menu if user clicks outside of the menu
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setMenuOpen(false);
    //         }
    //     };

    //     if (menuOpen) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     } else {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     }

    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [menuOpen]);
    const navigate = useNavigate()
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (cartCount > 0) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 600); // Reset animation after 600ms
        }
    }, [cartCount]);
    return (
        <header className="header">
            <HeaderText />
            <Link to="/cart" className="cart-icon" style={{
                position: "relative",
                display: "flex",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
            }} onClick={() => { setMenuOpen(false) }}>
                <motion.div
                animate={animate ? { rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <ShoppingCartIcon />
            </motion.div>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>
                }
            </Link>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>

                {menuOpen ? '✖' : '☰'}
            </button>
            <nav ref={menuRef} className={`nav ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    {token ?
                        <li><Link to="/login" onClick={() => { setMenuOpen(false); sessionStorage.removeItem('token');sessionStorage.removeItem('phoneNumber') }}>LogOut</Link></li>
                        :
                        <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>}
                    <li><Link to="/orders" onClick={() => setMenuOpen(false)}>Your Orders</Link></li>
                    <li><Link to="/policies" onClick={() => setMenuOpen(false)}>Policy</Link></li>
                    <li><Link to="/tutorial" onClick={() => setMenuOpen(false)}>Tutorial</Link></li>
                    {phoneNumber && phoneNumber !== "undefined" ?
                        <li><Link to="/admin" onClick={() => { setMenuOpen(false); }}>Admin</Link></li> : null
                        
                       }


                    {/* <li>  </li> */}
                </ul>
            </nav>

        </header>
    );
};

export default Header;

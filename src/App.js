import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import './App.css';
import Login from "./pages/Login";
import PickleList from "./pages/PickleList";
import CartList from "./pages/CartList";
import PrivateRoute from "./PrivateRoute";
import OrdersList from "./pages/OrderList";
import axios from "axios";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";
import OrderPopup from "./components/OrderPopup";
import ForgotPassword from "./pages/ForgotPassword";
import Policies from "./pages/Policies";
import Tutorial from "./pages/Tutorial";
import OrderUpdate from "./pages/OrderUpdate";

function App() {
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderList, setOrderList] = useState([]);


    const location = useLocation();

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            if (location.pathname === "/" || location.pathname === "/cart") {
                getCartItems();
            } else if (location.pathname === "/orders") {
                getOrderList();
            }
        }
    }, [location.pathname]); 

    const getCartItems = async () => {
        setShowLoader(true);

        let url = 'https://pickle-backend-2xil.onrender.com/api/v1/pickle/cartList'
        try {
            let response = await axios.get(url, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            setCartItems(response.data.cart)
            setShowLoader(false)

        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'failed to add to cart, please try again.');

        }
    }
    const onAddToCart = async (productName, pricePerKg) => {
        setShowLoader(true)
        let body = {
            productName: productName,
            pricePerKg: pricePerKg,
            weight: "1kg",
            quantity: 1,
            actualPrice:pricePerKg
        }
        let url = 'https://pickle-backend-2xil.onrender.com/api/v1/pickle/update-cart'
        try {
            let response = await axios.post(url, body, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            console.log(response);
            setCartItems(response.data.cart)
            setShowLoader(false)
        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'failed to add to cart, please try again.');

        }
    }

    const handleQuantityOrWeight = async (e, product, type, newWeight) => {
        console.log(e.target.value, product);

        setShowLoader(true)
        let body;
        if (type === "weight") {
            body = {

                productId: product._id,
                weight: e.target.value,
                quantity: product.quantity
            }
        } else if (type === "increment") {
            body = {

                productId: product._id,
                weight: product.weight,
                quantity: product.quantity >= 1 && product.quantity + 1
            }
        }
        else if (type === "decrement") {
            if (product.quantity <= 1) {
                setShowLoader(false)
                return;  // Exit the function if quantity is already 1

            }
            body = {
                productId: product._id,
                weight: product.weight,
                quantity: product.quantity - 1
            };
        } else return
       
        let url = 'https://pickle-backend-2xil.onrender.com/api/v1/pickle/update-product'
        try {
            let response = await axios.put(url, body, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            setCartItems(response.data.cart)
            setShowLoader(false)
        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'failed to add to cart, please try again.');

        }
    }
    const handleDeleteCartItem = async (productId) => {

        let url = `https://pickle-backend-2xil.onrender.com/api/v1/pickle/deleteCart-product?productId=${productId}`
        try {
            let response = await axios.delete(url, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            console.log(response);
            setCartItems(response.data.cart)
            setShowLoader(false)
        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'failed to add to cart, please try again.');

        }
    }
    const getOrderList = async ()=>{
        setShowLoader(true);

        let url = 'https://pickle-backend-2xil.onrender.com/api/v1/pickle/order-list'
        try {
            let response = await axios.get(url, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            setOrderList(response.data.orders)
            setShowLoader(false)

        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'error to load orders, please try again.');

        }
    }
    const placeOrder = async () => {

        let url = `https://pickle-backend-2xil.onrender.com/api/v1/pickle/send-order`
        try {
            await axios.post(url, {}, {
                headers: {
                    token: sessionStorage.getItem('token')   // <- Add the token in headers
                }
            })
            navigate('/orders')
            setShowLoader(false)
            setOrderPlaced(true);
            // getOrderList()
            // // Play order placed sound
            const audio = new Audio('/sounds/order-sound.wav'); // Place file in public/sounds folder
            audio.play();

            // Automatically close popup after 3 seconds
            setTimeout(() => setOrderPlaced(false), 3000);
        } catch (error) {
            setShowLoader(false)
            alert(error.response?.data?.message || 'failed to add to cart, please try again.');

        }

    };
    return (
        <div className="app-container" style={{
            // backgroundImage: "url('/images/background_pickle.jpg')"
        }}>
            <Header cartCount={cartItems?.products?.length} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<PrivateRoute><PickleList onAddToCart={onAddToCart} /></PrivateRoute>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/picklelist" element={<PrivateRoute><PickleList onAddToCart={onAddToCart} /></PrivateRoute>} /> */}
                    <Route path="/cart" element={<PrivateRoute><CartList placeOrder={placeOrder} handleQuantityOrWeight={handleQuantityOrWeight} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems?.products} totalPrice={cartItems.totalPrice} /></PrivateRoute>} />
                    <Route path="/orders" element={<PrivateRoute><OrdersList ordersList={orderList}/></PrivateRoute>} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="/admin" element={<OrderUpdate />} />


                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {/* <Footer /> */}
            <Loader showLoader={showLoader} />
            <OrderPopup setOrderPlaced={setOrderPlaced} orderPlaced={orderPlaced} />

        </div>
    );
}

export default App;

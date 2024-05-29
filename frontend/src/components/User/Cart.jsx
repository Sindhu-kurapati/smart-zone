import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import SmartZoneImg from '../../assets/smartzone3.png';
import UserShop from '../../assets/shop.png';
import UserCart from '../../assets/cart.png';
import Logout from '../../assets/logout.png';

import './User.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const addToCart = (productId, quantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: Math.max(0, item.quantity + quantity)
                };
            }
            return item;
        });
        setCartItems(updatedCartItems.filter(item => item.quantity > 0)); 
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems.filter(item => item.quantity > 0)));
    };

    const handleRemove = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleEmptyCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const handleTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const handleBuyNow = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <Navbar expand="lg" className="navbar-shopping">
                <Container fluid className='nav-Container'>
                    <Navbar.Brand onClick={() => navigate('/shop')}><img src={SmartZoneImg} height={60} width={50} />SmartZone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Nav className="ml-auto">
                        <Nav.Link className='navbars-link' onClick={() => navigate('/shop')}><img src={UserShop} height={50} width={50}/></Nav.Link>
                        <Nav.Link className='navbars-link' onClick={() => navigate('/cart')}><img src={UserCart} height={50} width={50}/></Nav.Link>
                        <Nav.Link className='navbars-link' onClick={() => navigate('/logout')}><img src={Logout} height={50} width={50}/></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {cartItems.length === 0 ? (
                <div className='empty-cart'>Your Cart Is Empty</div>
            ) : (
                    <div>
                        {cartItems.map((item, index) => (
                            <Card key={index} className='cart-item'>
                                <div className='item-details'>
                                    <img src={item.image} alt={item.title} />
                                    <h5>Price: <span>${item.price}</span></h5>
                                </div>
                                <div className='quantity-box'>
                                    <h2>Quantity:</h2>
                                    <div className='countbtns'>
                                        <button className='incrmntbtn' onClick={() => addToCart(item.id, 1)}>+</button>
                                        <h3>{item.quantity}</h3>
                                        <button className='decrmntbtn' onClick={() => addToCart(item.id, -1)}>-</button>
                                    </div>
                                    <button className='removebtn' onClick={() => handleRemove(item.id)}>Remove</button>
                                </div>

                                <div className='total-count'>
                                    <h3>Total:</h3>
                                    <h6>${item.price * item.quantity}</h6>
                                </div>
                            </Card>
                        ))}
                        <div className='total-row'>
                          <button onClick={handleEmptyCart} className='emptycartbtn'>Empty Cart</button>
                          <div className='buy'>
                            <h3>Total:</h3>
                            <h6>${handleTotal()}</h6>
                            <button onClick={handleBuyNow} className='buynowbtn'>Buy Now</button>
                          </div>
                        </div>
                        
                        
                    </div>
                )}
            
        </div>

    )
}

export default Cart;

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import SmartZoneImg from '../../assets/smartzone3.png';
import UserShop from '../../assets/shop.png';
import UserCart from '../../assets/cart.png';
import Logout from '../../assets/logout.png';
import SearchImg from '../../assets/search.png';

import axios from 'axios';
import './User.css';

const Shop = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    

    useEffect(()=>{
        const Fake_API = 'https://smart-zone.onrender.com/api/products/';
        axios.get(Fake_API).then(res=>{
            // console.log(res.data);
            setProducts(res.data);
            setFilteredProducts(res.data);
        });
    },[]);

    const handleApply =() => {
        let filtered = products.filter(product => {
            const price = parseFloat(product.price);
            return  (maxPrice === ''|| price <= parseFloat(maxPrice)) && 
                    (minPrice === ''|| price>= parseFloat(minPrice)) && 
                    (categoryFilter === '' || product.category === categoryFilter);
        });
        setFilteredProducts(filtered);
    }

    const handleSearch = ()=>{
        const filtered = products.filter(product=>
            product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        setFilteredProducts(filtered);
    }

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategoryFilter(selectedCategory);
    }

    const wrongClick = () => {
        setMaxPrice('');
        setMinPrice('');
        setCategoryFilter('');
        setFilteredProducts(products);
        setSearchTerm('');
    }

    //to store
    useEffect(()=>{
        const storedCartItems = localStorage.getItem('cartItems');
        if(storedCartItems){
            setCartItems(JSON.parse(storedCartItems));
        }
    },[]);

    const handleAddToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
            
            const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
    };
    
    
  return (
    <div>
        <Navbar expand="lg" className="navbar-shopping">
            <Container fluid className='nav-Container'>
                <Navbar.Brand onClick={()=>navigate('/shop')}>
                    <img src={SmartZoneImg} height={60} width={50}/>SmartZone
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Nav className="ml-auto"> 
                    <Nav.Link className='navbars-link' onClick={() => navigate('/shop')}><img src={UserShop} height={50} width={50}/></Nav.Link>
                    <Nav.Link className='navbars-link' onClick={() => navigate('/cart')}><img src={UserCart} height={50} width={50}/></Nav.Link>
                    <Nav.Link className='navbars-link' onClick={() => navigate('/logout')}><img src={Logout} height={50} width={50}/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Row className='usershop-row'>
            <Col className='shopcolumn1' xs={2}> 
                <label>Price</label>
                <p>Max Value: <input type='number' value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}/></p>
                <p>Min Value: <input type='number' value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} min={0}/></p>
                <button className='applybtn'onClick={handleApply}>Apply</button><br/>
                <label>Category :</label>
                <select id='category' names='category' onChange={handleCategoryChange}>
                    <option value=''>All</option>
                    <option value='Electronics"'>Electronics</option>
                    <option value='Jewelery'>Jewelery</option>
                    <option value="Men's clothing">Men's clothing</option>
                    <option value= "Women's clothing">Women's clothing</option>
                    <option value='None'>None</option>
                </select><br/>
                <button className='applybtn'onClick={handleApply}>Apply</button>
            </Col>

            <Col className='shopcolumn2' xs={9}>
                <h3>Select Your Product</h3>
                <div className='search-bar'>
                    <input className='search-input'value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                    <span className='wrong' onClick={wrongClick}>&times;</span>
                    <img className='search-image' src={SearchImg} onClick={handleSearch}/>
                </div>
                <div className ='card-container'>
                    {filteredProducts.map((product,index)=>(
                            <div key = {index}>
                                <Card className='card-box'>
                                    <img src={product.image} alt={product.title}/>
                                    <h6>{product.title}</h6>
                                    <h5 className='price'>Price:<span>${product.price}</span></h5>
                                    <h5 className='discount'>Discount: <span>{product.discount}%</span></h5>
                                    <button className='addtocartbtn'onClick={()=>handleAddToCart(product)} >Add to Cart</button>
                                </Card>
                            </div>
                        ))}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Shop




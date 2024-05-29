import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import SmartZoneImg from '../../assets/smartzone3.png';
import Cart from '../../assets/cart.png';
import Logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../context/userContext';

import './Seller.css';


const AddNewProduct = () => {

  const [ title, setTitle] = useState('');
  const [ price, setPrice] = useState('');
  const [ discount, setDsicount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [error, setError] = useState('');
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();


  useEffect(() => {
    const token = currentUser?.token;
    if (!token) {
      // Redirect to login page if token is not present
      navigate('/login');
    }
  }, [currentUser, navigate]);


  const createProduct = async (e) => {
    e.preventDefault();
  
    const postData = {
        title,
        price,
        discount,
        category,
        description,
        image,
    };

    try {
        const response = await axios.post('https://smart-zone.onrender.com/api/products', postData, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 201) {
            return navigate('/products');
        }
    } catch (err) {
        setError(err.response.data.message);
    }
};


  return (
    <div>
      <Navbar expand="lg" className="navbar-shopping">
        <Container fluid className='nav-Container'>
          <Navbar.Brand>
            <img alt='smartzone' src={SmartZoneImg} height={60} width={50} />SmartZone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="ml-auto">
            <Nav.Link className='navbars-link'><img alt='products' src={Cart} height={50} width={50} onClick={()=>navigate('/products')}/></Nav.Link>
            <Nav.Link className='navbars-link'><img alt='logout' src={Logout} height={50} width={50} onClick={()=>navigate('/logout')}/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Row className='product-row'>
        <Col className='product-col1' xs={5}>
        {error && <p className='form_error-message'>{error}</p>}
          <form onSubmit={createProduct}>
            <div className='product-inputs'>
              <input className='product-input' name='title' placeholder='Product Title' value={title} onChange={e => setTitle(e.target.value)} required/>
              <input className='product-description' name='description' placeholder='Product Description'  value={description} onChange={e => setDescription(e.target.value)} required/>
              <div className='product-inputs-row'>
                <input className='product-details' name='price' placeholder='Product Price' value={price} onChange={e => setPrice(e.target.value)} required/>
                <input className='product-details' name='discount' placeholder='Product Discount' value={discount} onChange={e => setDsicount(e.target.value)} required/>
              </div> 
              <input className='product-input' name='category' placeholder='Product Category' value={category} onChange={e => setCategory(e.target.value)}required/>
              <input className='product-input' name='image' placeholder='Product Image URL' value={image} onChange={e => setImage(e.target.value)} required/>
              <button className='addproductbtn'>Add Product</button>
            </div>
          </form>
          
        </Col>
        <Col  className='product-col2' xs={5}>
          <h1>Live Preview </h1>
          <p className='description'>{description}</p>
          <img src={image} height={200} width={200}/>
          <h3 className='title'>{title}</h3>
          <h5 className='category'>Category : {category}</h5>
          <h6 className='price'>Price : {price}₹</h6>
          <h6 className='discount'>Discount : {discount}%</h6>
          <form onSubmit={createProduct}>
            <button>Add to cart</button>
          </form>
          
        </Col>
      </Row>
    </div>
  )
}

export default AddNewProduct;

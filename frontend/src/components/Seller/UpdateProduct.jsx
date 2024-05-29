import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import SmartZoneImg from '../../assets/smartzone3.png';
import Cart from '../../assets/cart.png';
import Logout from '../../assets/logout.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

import './Seller.css';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const [product, setProduct] = useState({
    id: '',
    category: '',
    description: '',
    discount: 0,
    image: '',
    price: 0,
    title: ''
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://smart-zone.onrender.com/api/products/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.patch(`https://smart-zone.onrender.com/api/products/${id}`, product, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      navigate('/products');
    } catch (err) {
      console.log('Error updating product:', err);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-shopping">
        <Container fluid className='nav-Container'>
          <Navbar.Brand>
            <img src={SmartZoneImg} height={60} width={50} alt="SmartZone Logo" />SmartZone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="ml-auto">
            <Nav.Link className='navbars-link'><img src={Cart} height={50} width={50} alt="Cart" onClick={() => navigate('/products')} /></Nav.Link>
            <Nav.Link className='navbars-link'><img src={Logout} height={50} width={50} alt="Logout" onClick={() => navigate('/logout')} /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Row className='product-row'>
        <Col className='product-col1' xs={5}>
          <div className='product-inputs'>
            <input className='product-input' placeholder='Product Title' name='title' value={product.title} onChange={handleChange} />
            <input className='product-description' placeholder='Product Description' name='description' value={product.description} onChange={handleChange} />
            <div className='product-inputs-row'>
              <input className='product-details' placeholder='Product Price' name='price' type="number" value={product.price} onChange={handleChange} />
              <input className='product-details' placeholder='Product Discount' name='discount' type="number" value={product.discount} onChange={handleChange} />
            </div>
            <input className='product-input' placeholder='Product Category' name='category' value={product.category} onChange={handleChange} />
            <input className='product-input' placeholder='Product Image URL' name='image' value={product.image} onChange={handleChange} />
            <button className='updateproductbtn' onClick={handleUpdateProduct}>Update Product</button>
          </div>
        </Col>
        <Col className='product-col2' xs={5}>
          <h1>Live Preview</h1>
          <h3 className='title'>Title: {product.title}</h3>
          <p className='description'>{product.description}</p>
          <img src={product.image} height={200} width={200} alt="Product Preview" />
          <h5 className='category'>Category: {product.category}</h5>
          <h6 className='price'>Price: {product.price}₹</h6>
          <h6 className='discount'>Discount: {product.discount}%</h6>
          <button onClick={handleUpdateProduct}>Add to cart</button>
        </Col>
      </Row>
    </div>
  );
}

export default UpdateProduct;






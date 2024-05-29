import React, { useEffect, useRef, useState, useContext } from 'react';
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import SmartZoneImg from '../../assets/smartzone3.png';
import Cart from '../../assets/cart.png';
import Logout from '../../assets/logout.png';
import DeleteProduct from './DeleteProduct';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Loader from '../Loader';
import './Seller.css';

const SellerProduct = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const PRODUCT_API = 'https://smart-zone.onrender.com/api/products/';
    axios.get(PRODUCT_API)
      .then(res => {
        setProducts(res.data);
        const pricesData = res.data.map(product => product.price);
        const discountsData = res.data.map(product => product.discount);
        setPrices(pricesData);
        setDiscounts(discountsData);
        updateChartData(pricesData, discountsData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      });
  }, []);

  const updateChartData = (pricesData, discountsData) => {
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = pricesData;
      chartInstance.current.data.datasets[1].data = discountsData;
      chartInstance.current.update();
    }
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(chartContainer.current, {
      type: 'bar',
      data: {
        labels: products.map(product => product.title),
        datasets: [
          {
            label: 'Price',
            data: prices,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Discount',
            data: discounts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 0,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                label: {
                  content: 'Sales Performance',
                  enabled: true,
                  position: 'top'
                }
              }
            ]
          }
        },
        scales: {
          y: {
            ticks: {
              stepSize: 100,
              callback: function (value, index, values) {
                return value + '₹';
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [prices, discounts, products]);

  return (
    <div>
      <Navbar expand="lg" className="navbar-shopping">
        <Container fluid className='nav-Container'>
          <Navbar.Brand>
            <img src={SmartZoneImg} height={60} width={50} />SmartZone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="ml-auto">
            <Nav.Link className='navbars-link'><img src={Cart} height={50} width={50} onClick={()=>navigate('/products')}/></Nav.Link>
            <Nav.Link className='navbars-link'><img src={Logout} height={50} width={50} onClick={()=>navigate('/logout')}/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Row className='seller-shoprow'>
        <Col className='seller-shopcol1'>
          <div className='chart'>
            <canvas ref={chartContainer}/>
          </div>
        </Col>
        <Col className='seller-shopcol2'>
            <div className='heading-bar'>
                <i className='heading'>Your Products</i>
                <button className='addnewproductbtn' onClick={()=>navigate('/addnew')}>Add New Product</button>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='items-box'>
                {Array.isArray(products) && products.map(product => (
                  <div className='items' key={product._id}>
                      <img src={product.image} width={200} height={200} alt={product.title} />
                      <h6 className='title'>Title: {product.title}</h6>
                      <h5 className='price'>Price: {product.price}₹</h5>
                      <h5 className='discount'>Discount: {product.discount}%</h5>
                      <div>
                          <button className='edit-btn' onClick={()=>navigate(`/product/${product._id}`)}>Edit</button>
                          <DeleteProduct productId={product._id} setProducts={setProducts} products={products} />
                      </div>
                  </div>
                ))}
              </div>
            )}
        </Col>
      </Row>
    </div>
  );
}

export default SellerProduct;




import React from 'react';
import { Navbar, Nav, NavDropdown, Carousel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LogoImg from '../assets/Logo.png';
import Carousel6 from '../assets/Carousel6.jpg';
import Carousel2 from '../assets/Carousel2.jpg';
import Carousel5 from '../assets/Carousel5.jpg';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = (loginType) => {
        if (loginType === 'user') {
            navigate('/user-login');
        } else if (loginType === 'seller') {
            navigate('/seller-login');
        }
    };

    const handleRegister = (registerType) => {
        if (registerType === 'user') {
            navigate('/user-register');
        } else if (registerType === 'seller') {
            navigate('/seller-register');
        }
    };

    return (
        <div>
          <Navbar bg="light" variant="light" expand="lg" fixed="top" className="navbar">
            <Navbar.Brand onClick={() => navigate("/")}>
                <img src={LogoImg} alt="Logo" height={100} width={150} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="white-background">
                    <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                    <NavDropdown title="Select Portal" id="nav-dropdown">
                        <NavDropdown.Item onClick={() => handleLogin("user")}>User Login</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleRegister("user")}>User Registration</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogin("seller")}>Sellers Login</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleRegister("seller")}>Sellers Registration</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
          </Navbar>

            <div className='carousel-box'>
              
                <Carousel fade>
                    <Carousel.Item>
                        <img src={Carousel6} className='carouselImg' alt="First slide" />
                        <Carousel.Caption>
                            <h3>Explore Our Latest Products</h3>
                            <p>Find the perfect item for every occasion.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Carousel2} className='carouselImg' alt="Second slide" />
                        <Carousel.Caption>
                            <h3>Discover Amazing Deals</h3>
                            <p>Get exclusive discounts on your favorite brands.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Carousel5} className='carouselImg' alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Join Our Community</h3>
                            <p>Connect with like-minded individuals and share your passion.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default Home;

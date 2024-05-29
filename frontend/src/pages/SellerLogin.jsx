import React, { useState, useContext } from 'react';
import { Row, Col} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import SellerLoginImg from '../assets/sellerLogin.jpg';
import axios from 'axios';
import {UserContext} from '../context/userContext';

import './Home.css';
const SellerLogin = () => {

  const [userData, setUserData] = useState({
    email:'',
    password:''
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginSeller = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sellers/seller-login`, userData, {
        withCredentials: true
      });
      const user = await response.data;
      setCurrentUser(user)
      navigate('/products')
    }catch(err){
      setError(err.response.data.message || "An error occurred");
    }
  }


  return (
    <div className='sellerLogin'>
      <Row className='sellerLogin-row'>
        <Col><img src={SellerLoginImg} className='sellerLoginImg' alt="Seller Login"/></Col>

        <Col className='sellerLogin-form'>
          <form className="login-form" onSubmit={loginSeller}>

            <h1 >Seller Login</h1>
            {error && <p className='form_error-message'>{error}</p>}
            <div className="sellerLogininput-container">
              <input className="effect-3" type="text" placeholder="Enter mail" name="email" value={userData.email} onChange={changeInputHandler} autoFocus/><br/>
              <span className="focus-border"></span>
            </div>
            <div className="sellerLogininput-container">
              <input className="effect-3" type="password" placeholder="Enter password" name="password" value={userData.password} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <button className='sellerLoginbtn' type='submit'>Login</button>
          </form>
          <small className='small'>Don't have an account? <Link to="/seller-register">Sign Up</Link></small>
        </Col>
        
      </Row>
    </div>
  )
}

export default SellerLogin





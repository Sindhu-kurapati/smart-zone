import React, { useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import SellerRegistrationImg from '../assets/sellerRegistraion.jpg';
import axios from 'axios';
import './Home.css';

const SellerRegistration = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email:'',
    password:'',
    password2: ''
  })
  const [error, setError] = useState('');

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerSeller = async (e) => {
    e.preventDefault()
    setError('')
    try{
      // const response = await axios.post('http://localhost:5000/api/users/register', userData)
      const response = await axios.post('https://smart-zone.onrender.com/api/sellers/seller-register', userData)
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again")
      }
      navigate('/products')
    }catch(err){
      setError(err.response.data.message)
    }
  }



  return (
    <div className='sellerRegistration'>
      <Row className='sellerRegistration-row'>
          <Col><img src={SellerRegistrationImg} className='sellerRegistrationImg'/></Col>
          
          <Col className='sellerRegistration-form'>
            <form className='register-form' onSubmit={registerSeller}> 

            <h1 >Seller Registration</h1>
            {error && <p className='form_error-message'>{error}</p>}

            <div className="sellerRegistrationinput-container">
              <input className="effect-4" type="text" placeholder="Full Name" name="name" value={userData.name} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>
            <div className="sellerRegistrationinput-container">
              <input className="effect-4" type="text" placeholder="Enter mail" name="email" value={userData.email} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>
            <div className="sellerRegistrationinput-container">
              <input className="effect-4" type="password" placeholder="Enter password" name="password" value={userData.password} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>
            <div className="sellerRegistrationinput-container">
              <input className="effect-4" type="password" placeholder="Enter password" name="password2" value={userData.password2} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <button  className='sellerRegistrationbtn'  type='submit'>Register</button>
            </form>
            <small className='small'>Already have an account? <Link to="/seller-login">Sign in</Link></small>
          </Col>
          
      </Row>
    </div>
  )
}
export default SellerRegistration;




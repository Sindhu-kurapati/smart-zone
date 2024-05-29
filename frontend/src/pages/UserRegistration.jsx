import React, { useState } from 'react'
import { Row, Col} from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import userRegistrationImg from '../assets/userRegistration.jpg';
import axios from 'axios';

import './Home.css';

const UserRegistration = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try{
      // const response = await axios.post('http://localhost:5000/api/users/register', userData)
      const response = await axios.post('https://smart-zone.onrender.com/api/users/user-register', userData)
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again")
      }
      navigate('/shop')
    }catch(err){
      setError(err.response.data.message)
    }
  }


  return ( 
    <div className='userRegistration'>
      <Row className='userRegistration-row'>
        <Col><img src={userRegistrationImg} className='userRegistrationImg'/></Col>

        <Col className='userRegistration-form'>
          <form className="register-form" onSubmit={registerUser}>
            <h1 >User Registration</h1>
            {error && <p className='form_error-message'>{error}</p>}

            <div className="userRegistrationinput-container">
              <input className="effect-2" type="text" placeholder="UserName" name="name" value={userData.name} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <div className="userRegistrationinput-container">
              <input className="effect-2" type="text" placeholder="Enter mail" name="email" value={userData.email} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <div className="userRegistrationinput-container">
              <input className="effect-2" type="password" placeholder="Enter password" name="password" value={userData.password} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <div className="userRegistrationinput-container">
              <input className="effect-2" type="password" placeholder="Confirm password" name="password2" value={userData.password2} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <button  className='userRegistrationbtn' type='submit'>Register</button>
          </form>
          <small className='small'>Already have an account? <Link to="/user-login">Sign in</Link></small>
        </Col>
       
      </Row>
    </div>
  )
}

export default UserRegistration


import React, { useState, useContext } from 'react';
import { Row, Col} from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userLoginImg from '../assets/userLogin.jpg';
import {UserContext} from '../context/userContext';


import './Home.css';

const UserLogin = () => {

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

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/user-login`, userData, {
        withCredentials: true
      });
      const user = await response.data;
      setCurrentUser(user)
      navigate('/shop')
    }catch(err){
      setError(err.response.data.message)
    }
  }


  return (
    <div className='userLogin'>
      <Row className='userLogin-row'>
        <Col><img src={userLoginImg} className='userLoginImg'/></Col>

        <Col className='userLogin-form'>
          <form className='login-form'  onSubmit={loginUser}>
            <h1 >User Login</h1>
            {error && <p className='form_error-message'>{error}</p>}

            <div className="userLogininput-container">
              <input className="effect-1" type="text" placeholder="Enter Email" name="email" value={userData.email} onChange={changeInputHandler} autoFocus/><br/>
              <span className="focus-border"></span>
            </div>
            <div className="userLogininput-container">
              <input className="effect-1" type="password" placeholder="Enter Password" name="password" value={userData.password} onChange={changeInputHandler}/><br/>
              <span className="focus-border"></span>
            </div>

            <button className='userLoginbtn'type='submit'>Login</button>
          </form>
          <small className='small'>Don't have an account? <Link to="/user-register">Sign Up</Link></small>
        </Col>

      </Row>
    </div>
  )
}

export default UserLogin

import React, {useEffect}from 'react';

import { useNavigate } from 'react-router-dom';

import './User.css';
const Checkout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('cartItems');
  }, []);

  return (
    <div className='checkout'>
      <h1>Your Order Is Placed!</h1>
      <h5>We Will Get Back To You Soon</h5>
      <h6>Enjoy the Shopping <span className='arrow-down'>&#10534;</span></h6>
      <button className='go-back-to-shop-btn' onClick={()=>navigate('/shop')}>Go Back To Shop</button>
    </div>
  )
}

export default Checkout;

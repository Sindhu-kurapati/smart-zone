import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/userContext';

const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
   
      setCurrentUser(null);
      navigate('/');
    };
    logoutUser();
  }, []);

  return <p>Logging out...</p>; 

}

export default Logout

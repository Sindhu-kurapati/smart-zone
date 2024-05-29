import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const DeleteProduct = ({ productId, setProducts, products }) => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    try {
      if (!productId) {
        alert('Product ID is missing');
        return;
      }

      const response = await axios.delete(`https://smart-zone.onrender.com/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 204) {
        alert('Product deleted successfully');
        setProducts(products.filter(product => product._id !== productId));
        navigate('/products');
      } else {
        alert('Error deleting product');
      }
    } catch (err) {
      console.error("Couldn't delete post", err);
      alert('Error deleting product');
    }
  };

  return (
    <button  className='delete-btn' onClick={handleDeleteProduct}>Delete Product</button>
  );
};

export default DeleteProduct;




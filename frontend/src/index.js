import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';




import Home from './pages/Home';

import SellerRegistration from './pages/SellerRegistration';
import SellerLogin from './pages/SellerLogin';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';

import AddNewProduct from './components/Seller/AddNewProduct';
import SellerProduct from './components/Seller/SellerProduct';
import UpdateProduct from './components/Seller/UpdateProduct';
import DeleteProduct from './components/Seller/DeleteProduct';

import Shop from './components/User/Shop';
import Cart from './components/User/Cart';
import Checkout from './components/User/Checkout';

import UserProvider from './context/userContext';
import Logout from './pages/Logout';

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([

      {path: '/', element: <Home/>},
      {path: "seller-register", element: <SellerRegistration/>},
      {path: "seller-login", element: <SellerLogin/>},
      {path: "user-register", element: <UserRegistration/>},
      { path: "user-login", element: <UserLogin /> },

      {path: 'shop', element: <Shop/>},
      {path: 'cart', element: <Cart/>},
      {path: 'checkout', element: <Checkout/>},

      {path: 'products', element: <SellerProduct/>},
      {path: 'addnew', element: <AddNewProduct/>},
      {path: 'product/:id', element: <UpdateProduct/>},
      {path: 'product/:id', element: <DeleteProduct/>},

      {path:"logout", element: <Logout/>},

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>
);



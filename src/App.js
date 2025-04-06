


import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'; 
import Home from './Components/Home/Home';
import About from './Components/About/About';
import React from "react";



import Notfound from './Components/Notfound/Notfound';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ContextProvider from './Context/CartContext';
import UserContextProvider from './Context/UserContext';
import ProtuctRouter from './Components/ProtectRouter/ProtuctRouter';
import FeaturedProducts from './Components/FeaturedProducts/FeaturedProducts';
import Brands from './Components/Brands/Brands';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CategorySlider from './Components/Categories/CategorySlider';
import  { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile';
import UserDetails from './Components/UserDetails';
import WishList from './Components/WishList';








// تعريف الروابط
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index:true, element:  <ProtuctRouter> <Home /></ProtuctRouter> },
        { path: 'featuredproducts', element: <ProtuctRouter><FeaturedProducts /></ProtuctRouter> }, // الصفحة الرئيسية
      { path: 'about', element: <ProtuctRouter> <About /></ProtuctRouter> }, 
      { path: 'brands', element: <ProtuctRouter> <Brands /></ProtuctRouter> }, 
      { path: 'products', element: <ProtuctRouter> <Products /></ProtuctRouter> }, 
      { path: 'productdetails/:id', element: <ProtuctRouter> <ProductDetails /></ProtuctRouter> }, 
      
       { path: 'categories', element:  <ProtuctRouter> <Categories /></ProtuctRouter> },
       { path: 'categoryslider', element:  <ProtuctRouter> <CategorySlider /></ProtuctRouter> },
       { path: 'cart', element:  <ProtuctRouter> <Cart /></ProtuctRouter> },
       { path: 'profile', element:  <ProtuctRouter> <Profile /></ProtuctRouter> },
       { path: 'wishlist', element:  <ProtuctRouter> <WishList /></ProtuctRouter> },
       { path: 'userdetails', element:  <ProtuctRouter> <UserDetails /></ProtuctRouter> },
       { path: 'login', element:   <Login /> },
       { path: 'register', element:  <Register />},
      { path: '*', element: <Notfound /> }
    ]
  }
]);




export default function App() {
  return <ContextProvider>
  
  <UserContextProvider>
   
 
  
  <RouterProvider router={router} ></RouterProvider>
  <Toaster/>
 
  </UserContextProvider>
  </ContextProvider>
}






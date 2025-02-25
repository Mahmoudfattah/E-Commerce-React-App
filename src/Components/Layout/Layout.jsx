import React, { useContext, useEffect } from 'react';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from "../../Context/UserContext";




export default function Layout() {

   const {setUserToken} = useContext(UserContext)

   useEffect(() => {
     if (localStorage.getItem('userToken') !==null)
       {

    setUserToken (localStorage.getItem('userToken'))
     }
   
    
   }, []);
   


 
 
    return <>
    <Navbar/>
   
  <div className='container'>  <Outlet/></div>
   
    <Footer/>
  
  
  
  
  
  
  
  
  
  
    </>
}

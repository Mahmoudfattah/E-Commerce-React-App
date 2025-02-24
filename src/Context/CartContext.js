

import axios from "axios";
import {createContext, useState,useEffect } from "react"

      
      let headers= {
        token:  localStorage.getItem('userToken')
      }
    
     export let Context= createContext();

    export default function ContextProvider(props){

      const [cartId,setcartId] = useState(null)
 
       function addProductCart (productId){
     
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
          productId:productId 
        },{
         headers:headers
        }).then((res)=>res).catch((err)=>err)            
       }
       function updateCountProduct(productId,count){
     
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
         count:count
        },{
         headers:headers
        }).then((res)=>res).catch((err)=>err)            
       }
       
       

      function cartProducts(){

          return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
               headers:headers
          }).then((res)=>res).catch((err)=>err)    
            
      } 
      function wishList(){

          return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
               headers:headers
          }).then((res)=>res).catch((err)=>err)    
            
      } 
  
      function addToWishList(productId){

        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
          productId:productId 
        },{
         headers:headers
        }).then((res)=>res).catch((err)=>err)            
       }

      function clearAll(){

          return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
               headers:headers
          }).then((res)=>res).catch((err)=>err)    
            
      } 
        function removeProductsCart(productId){

          return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
               headers:headers
          }).then((res)=>res).catch((err)=>err)    
            
      } 
        function removeFromWishList(productId){

          return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
               headers:headers
          }).then((res)=>res).catch((err)=>err)    
            
      } 


      function onlinePayment(cartId,valus,url){
 
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
          shippingAddress: valus
        },{
          headers:headers
        }).then((res)=>res).catch((err)=>err) 
        
      }


     async function getCartId(){
         
       let {data}= await cartProducts()
       setcartId(data?.data._id) 
      
       
       
      }

       useEffect(()=> {
           getCartId();
       },[]);
      
  
 


     //  cartProducts().then((data) => console.log("Cart Products:", data));

           return <Context.Provider value={{removeFromWishList,wishList,addToWishList,cartId,addProductCart,getCartId,cartProducts,removeProductsCart,updateCountProduct,clearAll,onlinePayment}} >
            {props.children}
           </Context.Provider>





     } 
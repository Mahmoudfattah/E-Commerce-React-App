import { useState,createContext } from "react";

  
 export  let UserContext =  createContext();

 export default  function UserContextProvider(props){
     const  [userToken, setUserToken]=  useState(null)
     const  [userDetails, setUserDetails]=  useState(null)
    
    return <UserContext.Provider value={{userToken , setUserToken,userDetails,setUserDetails}}>
     
      {props.children}
    </UserContext.Provider>   


     }
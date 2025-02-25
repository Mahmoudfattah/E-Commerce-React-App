import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'

export default function Profile() {
    let{userDetails,}=useContext(UserContext)
    // localStorage.setItem('userToken', data.token)
    // let {setUserDetails}= localStorage.getItem('userDetails')
                  
      


  return (
    <div className=' container mt-5'>
     <h1>{userDetails?.name}</h1>
     <h1>{userDetails?.email}</h1>
    
    </div>
  )
}

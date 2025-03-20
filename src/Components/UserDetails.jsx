import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Context } from '../Context/CartContext'



export default function UserDetails() {
  
    let {cartId,onlinePayment}= useContext(Context)

  async function submitePayment(valus){
   let response = await onlinePayment(cartId,valus);
  window.location.href= response?.data.session.url ;
}

//   function submitePayment(){
//     console.log('hello')

// }



  let formik = useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:''
    },
    onSubmit:submitePayment
  })


 

  return <>

      
    <div className="container align-content-center justify-content-center pt-5">
         <div className="row">
         <form onSubmit={formik.handleSubmit} className=' w-75 mx-auto'>
            <h2 className='pt-5 text-gray-900 fw-bolder text-gray py-3'>Checkout</h2>

            <label htmlFor="phone" className="text-gray-900p fw-bolder py-2">Phone</label>
                <input
                  type="number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className="form-control mb-2"
                  id="phone"
                />
            <label htmlFor="city" className="text-gray-900p fw-bolder py-2">City</label>
                <input
                  type="text"
                  name="city"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className="form-control mb-2"
                  id="city"
                />

                
            <label htmlFor="details" className="text-gray-900p fw-bolder py-2">Details</label>
                <input
                  type="text"
                  name="details"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.details}
                  className="form-control mb-2"
                  id="details"
                />
            
            <button
                    
                    type="submit"
                    className="btn bg-main text-white w-100 mt-3 mb-5"
                  >
                    Online Payment
                  </button>
              
        </form>
         </div>
    </div>
  
  
  </>
}





import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import{ Triangle} from 'react-loader-spinner'


export default function Products() {
    
   function getProducts(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(res=> res.data)

   }
   let{ isLoading, isError,data} = useQuery(
    {
    queryKey :['products'],
    queryFn:getProducts

    }
 
   )
  
   

  
  
  if (isError) return <p>isError: {isError.message}</p>;

  return <>
      <div className="container py-2 mt-5">

      <div className="row">
      <h2 className=' fs-3 ps-3 fw-bolder text-gray mt-5 '>All Products</h2>
    
    {isLoading ? <>
    
      <div className="d-flex justify-content-center align-items-center vh-100">
      <Triangle
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    
    
    
    
    </> : <>  {data.data.map((product) => <div  key={product.id} className='col-md-3'>
            <Link to={`/productdetails/${product.id}`}>
            <div className="product cursor-pointer py-3 px-2 my-3">
 
            <img className='w-100' src={product.imageCover} alt={product.title} />
             <span className='text-main fs-5 ps-2 fw-semibold'>{product.title.split(" ").slice(0, 2).join(" ")} </span>
             <p className=' py-1 ps-2 fw-semibold'> {product.slug.split("-").slice(0, 2).join("-")}</p>
             <div className="d-flex justify-content-between ">
               <p className='ps-2'>{product.price} EGP</p>
               <p className='pe-2'> 
                 <i className=" fa fa-star me-1 " style={{ color: "orange" }}></i>
                 {product.ratingsAverage}
                </p>
                 
 
 
             </div>
             <div className="d-flex justify-content-between">
                   <button className='btn bg-main text-white w-75 '> Add To Cart</button>
                   <Link className='align-content-center pe-2'>
                    <i className='fa-regular fa-heart fs-3' style={{ color: 'red' }}></i>
                    </Link>
 
                 </div> 
            </div>
         
         
            </Link>
         
          </div>
       
       )}   </>}

       </div>
    
     
    
    </div>

    </>
}

 
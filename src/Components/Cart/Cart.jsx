import React, { useContext, useEffect, useState} from 'react'
import {Context} from '../../Context/CartContext';
// import { useQuery } from '@tanstack/react-query';
import {ThreeDots} from 'react-loader-spinner'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {
  
   let {cartProducts,removeProductsCart,updateCountProduct,clearAll}=useContext(Context)
   const [data, setData] = useState(null);
 


  //  async  function viewCartProducts(){
  //      return await  cartProducts()
  //    }
  //    let {data,isLoading}=useQuery({
  //     queryKey: ['cartproducts'],
  //     queryFn: viewCartProducts
  //    }) 

  async  function viewCartProducts(){
       let {data}= await cartProducts();
     
       if (data ) {
        setData(data);
      
      } else {
        setData({ data: { products: [] } }); // تعيين قائمة فارغة عند عدم وجود بيانات
      }
      
       
       }
  async  function clearAllProducts(){
       let {data}= await clearAll();
       setData(data)
         setData(null)
         viewCartProducts()
       
       }


  async  function updateCount(productId,count){
       let {data}= await updateCountProduct(productId,count);
       setData(data)
      
       
       }


       async  function removeCartProducts(id){
        let {data}= await  removeProductsCart(id);
        setData(data)
        if(data.status  === 'success' )
          {
            toast.success('product removed successfully'  , {className: 'bg-black text-white',} )
            // ,{ icon: '👏',  className: 'fw-semiblod',}
          }
          else{
            toast.error('please try again')
          }


        }

       useEffect(()=>{
        viewCartProducts();
        
       },[])

  
 
       return (
        <>
          <div className="container py-2 mt-5">
            <div className="row">
              <div className="d-flex align-content-center justify-content-between col-md-10 m-auto pt-5">
                <h2 className="text-gray fw-bolder">Shopping Cart</h2>
                <button onClick={() => clearAllProducts()} className="btn btn-danger fw-bold">
                  Clear All
                </button>
              </div>
      
              {data?.data ? (
                <>
                  <div className="d-flex align-content-center justify-content-between col-md-10 m-auto py-4">
                    <h5 className="text-gray fw-bold">
                      Total Price: <span className="text-main">{data?.data?.totalCartPrice ?? 0} EGP</span>
                    </h5>
                    <h5 className="text-gray fw-bolder">
                      Total Number: <span className="text-main">{data?.numOfCartItems ?? 0}</span>
                    </h5>
                  </div>
      
                  {data.data.products.map((product) => (
                    <div key={product.product.id} className="col-md-10 m-auto py-4 cart rounded-4 mb-4">
                      <div className="row">
                        <div className="col-md-2">
                          <img src={product.product.imageCover} alt={product.product.title} className="w-100" />
                        </div>
                        <div className="col-md-10 align-content-center">
                          <div className="d-flex align-content-center justify-content-between">
                            <div>
                              <h5 className="text-gray fw-bolder">
                                {product.product.title.split(" ").slice(0, 3).join(" ")}
                              </h5>
                              <p className="text-gray fw-bold pt-1">
                                <span className="text-main fw-bolder">{product.price} EGP</span>
                              </p>
                              <button
                                onClick={() => removeCartProducts(product.product.id)}
                                className="p-0 border-0 bg-transparent text-danger ps-1 fw-bolder"
                              >
                                <i className="fas fa-trash text-danger fs-5"></i> Remove
                              </button>
                            </div>
                            <div className="align-content-center px-1">
                              <button
                                onClick={() => updateCount(product.product.id, product.count + 1)}
                                className="btn bg-transparent btn-outline-success border-2 text-dark"
                              >
                                +
                              </button>
                              <span className="fs-5 px-2 fw-bold">{product.count}</span>
                              <button
                                onClick={() => updateCount(product.product.id, product.count - 1)}
                                className="btn bg-transparent btn-outline-success text-dark border-2"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <ThreeDots visible={true} height="80" width="80" color="#4fa94d" radius="9" ariaLabel="three-dots-loading" />
                </div>
              )}
      
              <Link to="/userdetails">
                <div className="col-md-10 m-auto py-5">
                  <button className="btn bg-main text-white w-100 fw-bold">Checkout</button>
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }
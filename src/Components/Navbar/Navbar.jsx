

import React, { useContext,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import {Context} from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext'
import { useQuery} from '@tanstack/react-query';



  

export default function Navbar() {

  
  let{userToken, setUserToken,userDetails,setUserDetails}= useContext(UserContext)


  let navigate =useNavigate();



  let {cartProducts,wishList}=useContext(Context)


  async function viewCartProducts() {
    return await cartProducts();
  }
  const { data: cartData } = useQuery({
    queryKey: ['cartproducts'],
    queryFn: viewCartProducts,
  });
  
  // تحديث العدد عند تغيير بيانات السلة
  let totalCount = cartData?.data?.numOfCartItems || 0;

  // جلب بيانات قائمة المفضلة (wishlist)
  async function viewWishList() {
    return await wishList();
  }
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'], // تأكد من استخدام مفتاح مختلف
    queryFn: viewWishList,
  });
  let Count = wishlistData?.data?.count || 0;




    function logOut(){
     localStorage.removeItem('userToken')
     localStorage.removeItem('userDetails')
      setUserToken(null);
      setUserDetails(null);
      navigate('/login')
     
    }

    useEffect(() => {
      if (!userDetails) {
          const savedUser = localStorage.getItem('userDetails');
          if (savedUser) {
              setUserDetails(JSON.parse(savedUser)); // تحديث البيانات من LocalStorage
          }
      }
  }, [userDetails, setUserDetails]); 



return (
  <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-md fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand ps-5" to="#">
          <img src={logo} alt="nav-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ps-5">
            {userToken !== null && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold text-gray" to="">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-gray" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-gray" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-gray" to="categories">
                    Categories
                  </Link>
                </li>
               
              </>
            )}
          </ul>

          {/* أيقونات السلة والمفضلة */}
          <div className="d-flex align-items-center ps-5">
          <Link to="cart">
     <div className="position-relative" style={{ zIndex: 1050 }}>
       <i className=" mx-2 fa fa-cart-shopping position-relative fs-3 text-main">
         <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white px-1 py-0 fs-7" 
              style={{ fontSize: "15px", minWidth: "20px", height: "20px", lineHeight: "20px" }}>
          {totalCount}
        </span>
      </i>
    </div>
  </Link>
  <Link to="wishlist">
    <div className="position-relative" style={{ zIndex: 1050 }}>
      <i className="fa-regular fa-heart mx-2 position-relative fs-3 text-main">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white px-1 py-0 fs-7" 
              style={{ fontSize: "15px", minWidth: "20px", height: "20px", lineHeight: "20px" }}>
          {Count}
        </span>
      </i>
    </div>
  </Link>

            {/* القائمة المنسدلة للمستخدم */}
            <div className="dropdown px-1">
              <button
                type="button"
                className="btn bg-main rounded-circle text-white fw-bold fs-6 d-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "33px", height: "33px" }}
              >
                {userDetails?.name?.charAt(0).toUpperCase() || "U"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end py-0 w-44">
                <li className="dropdown-item pt-2 text-sm text-gray-900 px-2 mb-0">
                  <span className="text-main fw-bolder">{userDetails?.name || "No Name"}</span>
                  <p className="pt-2 fw-bold">{userDetails?.email || "No Email"}</p>
                </li>
                <li>
                  <hr className="dropdown-divider py-0 my-0 bg-main" />
                </li>
                {userToken !== null ? (
                  <li>
                    <button className="dropdown-item fw-bold text-danger nav-l" onClick={logOut}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>
);

}

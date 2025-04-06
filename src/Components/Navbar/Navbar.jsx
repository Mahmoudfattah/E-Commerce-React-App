import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';  // تأكد من استخدام NavLink
import logo from '../../Assets/images/freshcart-logo.svg';
import { Context } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  const { userToken, setUserToken, userDetails, setUserDetails } = useContext(UserContext);
  const { cartProducts, wishList } = useContext(Context);
  const navigate = useNavigate();

  // ----- cart products -----
  async function viewCartProducts() {
    return await cartProducts();
  }

  const { data: cartData } = useQuery({
    queryKey: ['cartproducts'],
    queryFn: viewCartProducts,
    cacheTime: 0,
  });

  let totalCount = cartData?.data?.numOfCartItems || 0;

  // ----- wishlist -----
  async function viewWishList() {
    return await wishList();
  }

  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: viewWishList,
    cacheTime: 0,
  });

  let Count = wishlistData?.data?.count || 0;

  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userDetails');
    setUserToken(null);
    setUserDetails(null);
    navigate('/login');
  }

  useEffect(() => {
    if (!userDetails) {
      const savedUser = localStorage.getItem('userDetails');
      if (savedUser) {
        setUserDetails(JSON.parse(savedUser));
      }
    }
  }, [userDetails, setUserDetails]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-md fixed-top">
        <div className="container-fluid">
          <div className="navbar-brand ps-5 cursor-pointer2" to="/">
            <img src={logo} alt="nav-logo" />
          </div>
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
                    <NavLink 
                      className={({ isActive }) => `nav-link fw-bold text-gray ${isActive ? 'active' : ''}`}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      className={({ isActive }) => `nav-link fw-bold text-gray ${isActive ? 'active' : ''}`}
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      className={({ isActive }) => `nav-link fw-bold text-gray ${isActive ? 'active' : ''}`}
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      className={({ isActive }) => `nav-link fw-bold text-gray ${isActive ? 'active' : ''}`}
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* أيقونات السلة والمفضلة */}
            <div className="d-flex align-items-center ps-5">
              <NavLink to="/cart">
                <div className="position-relative" style={{ zIndex: 1050 }}>
                  <i className="mx-2 fa fa-cart-shopping position-relative fs-3 text-main">
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white px-1 py-0 fs-7"
                      style={{
                        fontSize: '15px',
                        minWidth: '20px',
                        height: '20px',
                        lineHeight: '20px',
                      }}
                    >
                      {totalCount}
                    </span>
                  </i>
                </div>
              </NavLink>
              <NavLink to="/wishlist">
                <div className="position-relative" style={{ zIndex: 1050 }}>
                  <i className="fa-regular fa-heart mx-2 position-relative fs-3 text-main">
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white px-1 py-0 fs-7"
                      style={{
                        fontSize: '15px',
                        minWidth: '20px',
                        height: '20px',
                        lineHeight: '20px',
                      }}
                    >
                      {Count}
                    </span>
                  </i>
                </div>
              </NavLink>

              {/* القائمة المنسدلة للمستخدم */}
              <div className="dropdown px-1">
                <button
                  type="button"
                  className="btn bg-main rounded-circle text-white fw-bold fs-6 d-flex align-items-center justify-content-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: '33px', height: '33px' }}
                >
                  {userDetails?.name?.charAt(0).toUpperCase() || 'U'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end py-0 w-44">
                  <li className="dropdown-item pt-2 text-sm text-gray-900 px-2 mb-0">
                    <span className="text-main fw-bolder">
                      {userDetails?.name || 'No Name'}
                    </span>
                    <p className="pt-2 fw-bold">{userDetails?.email || 'No Email'}</p>
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
                        <NavLink className="dropdown-item" to="login">
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="register">
                          Register
                        </NavLink>
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

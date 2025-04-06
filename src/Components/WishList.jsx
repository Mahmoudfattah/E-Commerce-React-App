import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/CartContext';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function WishList() {
  const { wishList, removeFromWishList, addProductCart } = useContext(Context);
  const [data, setData] = useState(null);

  async function viewWishList() {
    try {
      const response = await wishList();
      console.log("Wishlist Response:", response);
      // الاستجابة تحتوي على response.data.data كمصفوفة من المنتجات
      if (response?.data?.status === 'success') {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setData([]);
    }
  }

  async function removeProductFromWishList(id) {
    try {
      const response = await removeFromWishList(id);
      if (response?.data?.status === 'success') {
        toast.success('Product removed successfully', { className: 'bg-black text-white' });
        // تحديث الحالة محليًا بحذف المنتج المُزال
        setData(prevData => prevData.filter(product => product._id !== id));
      } else {
        toast.error('Please try again');
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error('Error removing product');
    }
  }

  async function addProductToCart(productId) {
    try {
      const response = await addProductCart(productId);
      if (response?.status === 'success') {
        toast.success('Product added successfully', { className: 'bg-black text-white' });
      } else {
        toast.error('Please try again');
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error('Error adding product');
    }
  }

  useEffect(() => {
    viewWishList();
   
   
  }, []);
  // useEffect(() => {
  //   viewWishList();
  //   const timer = setTimeout(() => {
  //     window.location.reload();
  //   }, 9000);
    
  //   return () => clearTimeout(timer); // Cleanup if the component unmounts
  // }, []);

  return (
    <div className="container py-2 mt-5">
      <div className="row">
        <div className="d-flex align-content-center justify-content-between col-md-10 m-auto pt-5">
          <h2 className="text-gray fw-bolder py-5">Wishing List</h2>
        </div>
        {data === null ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <ThreeDots visible={true} height="80" width="80" color="#4fa94d" radius="9" ariaLabel="three-dots-loading" />
          </div>
        ) : data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} className="col-md-10 m-auto py-4 cart rounded-4 mb-4">
              <div className="row">
                <div className="col-md-2">
                  <img src={product.imageCover} alt={product.title} className="w-100" />
                </div>
                <div className="col-md-10 align-content-center">
                  <div className="d-flex align-content-center justify-content-between">
                    <div>
                      <h5 className="text-gray fw-bolder">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </h5>
                      <p className="text-gray fw-bold pt-1">
                        <span className="text-main fw-bolder">{product.price} EGP</span>
                      </p>
                      <button
                        onClick={() => {
                          removeProductFromWishList(product._id);
                     
                        }}
                        className="p-0 border-0 bg-transparent text-danger ps-1 fw-bolder"
                      >
                        <i className="fas fa-trash text-danger fs-5"></i> Remove
                      </button>
                    </div>
                    <div className="align-content-center px-1">
                      <button className="btn bg-main text-white" onClick={() => addProductToCart(product._id)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-muted">No products in wishlist</h3>
        )}
      </div>
    </div>
  );
}


import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Context } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  const { addProductCart, addToWishList, removeFromWishList } = useContext(Context);
  const [wishlisted, setWishlisted] = useState({});

  function getFeaturedProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => res.data);
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['featuredproducts'],
    queryFn: getFeaturedProducts,
  });

  // إضافة منتج للسلة
  async function addProductToCart(productId) {
    let response = await addProductCart(productId);
    if (response.status === 'success') {
      toast.success('Product added successfully', { className: 'bg-black text-white' });
    } else {
      toast.error('Please try again');
    }
  }

  // إضافة أو إزالة منتج من المفضلة
  async function toggleWishList(productId) {
    if (wishlisted[productId]) {
      // إذا كان المنتج موجودًا في المفضلة، نقوم بإزالته
      let response = await removeFromWishList(productId);
      if (response.data.status === 'success') {
        setWishlisted((prev) => {
          const updatedWishlisted = { ...prev };
          delete updatedWishlisted[productId];
          return updatedWishlisted;
        });
        toast.success('Product removed from Wishlist', { className: 'bg-black text-white' });
      } else {
        toast.error('Please try again');
      }
    } else {
      // إذا لم يكن المنتج في المفضلة، نقوم بإضافته
      let response = await addToWishList(productId);
      if (response.status === 'success') {
        setWishlisted((prev) => ({ ...prev, [productId]: true }));
        toast.success('Product added to Wishlist', { className: 'bg-black text-white' });
      } else {
        toast.error('Please try again');
      }
    }
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container py-2 mt-5">

       <div className="row">
      <h2 className=' fs-3 ps-3 fw-bolder text-gray mt-5 '>All Products</h2>
    
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <>
            {data.data.map((product) => (
              <div key={product.id} className="col-md-3">
                <div className="product rounded-3 cursor-pointer py-3 px-2 my-3">
                  <Link to={`/productdetails/${product.id}`}>
                    <img className="w-100" src={product.imageCover} alt={product.title} />
                    <span className="text-main fs-5 ps-2 fw-semibold pt-2">
                      {product.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className="py-1 ps-2 fw-semibold d-block">
                      {product.slug.split('-').slice(0, 2).join('-')}
                    </span>
                    <div className="d-flex justify-content-between">
                      <span className="ps-2">{product.price} EGP</span>
                      <span className="pe-2">
                        <i className="fa fa-star me-1" style={{ color: 'orange' }}></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn bg-main text-white w-75"
                      onClick={() => addProductToCart(product.id)}
                    >
                      Add To Cart
                    </button>
                    <Link
                      className="align-content-center"
                      onClick={() => toggleWishList(product.id)}
                    >
                      <i
                        className={`${wishlisted[product.id] ? 'fa-solid' : 'fa-regular'} fa-heart mx-2 fs-3`}
                        style={{ color: 'red' }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

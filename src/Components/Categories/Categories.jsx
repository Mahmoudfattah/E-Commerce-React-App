import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ThreeDots } from 'react-loader-spinner';

Modal.setAppElement('#root');

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching categories:", err);
        return [];
      });
  }

  let { data, isLoading } = useQuery({
    queryKey: ['getcategories'],
    queryFn: getAllCategories
  });

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="container py-2 mt-5">
      <div className="row">
        <h2 className="fs-3 ps-5 fw-bolder text-gray mt-5"> Categories</h2>

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
          data?.data?.map((category) => (
            <div key={category._id} className="col-md-3 p-4">
              <div 
                className="category rounded-3 cursor-pointer text-center h-100 "
                onClick={() => openModal(category)}
                style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <img className="w-100 h-75 object-fit-cover rounded" src={category.image} alt={category.name} />
                <p className="fs-5 fw-semibold pt-3">{category.name}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* نافذة منبثقة مع تعديل التخطيط ليكون مشابهًا لـ Brands */}
    

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)", // خلفية شفافة للنافذة
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: '50%', // ضبط عرض النافذة
            height: '72vh', // ضبط الارتفاع ليكون متناسقًا
            margin: 'auto',
           
            maxWidth: '600px',
            padding: '20px',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            border: 'none',
            display: 'flex',
            flexDirection: 'column', // ترتيب عمودي
            alignItems: 'center', // توسيط العناصر
            justifyContent: 'center', // منع الفراغات الزائدة
            gap: '15px', // مسافة مناسبة بين العناصر
          }
        }}
      >
        {selectedCategory && (
          <div className="row w-100 h-100 align-content-center justify-content-between ">
            <button onClick={closeModal} className="btn btn-close position-absolute top-0 end-0 m-3"></button>

            <div className="col-md-5 align-content-center text-center text-md-start">
            <h2 className="fw-bold text-main pt-2">{selectedCategory.name}</h2>
            <p className="text-muted text-gray fw-bold">{selectedCategory.slug}</p>
            </div>
            <div className="col-md-5 align-content-center pb-2 ">
            <img className="w-100 rounded object-fit-cover " src={selectedCategory.image} alt={selectedCategory.name} />
            </div>

          
         
            <hr  />
        
          </div>
        )}
      </Modal> 
    </div>
  );
}

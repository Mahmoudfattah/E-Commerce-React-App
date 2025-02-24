import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ThreeDots } from 'react-loader-spinner';

Modal.setAppElement('#root'); // لتجنب خطأ الوصول في الـ Modal

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching brands:", err);
        return [];
      });
  }

  let { data, isLoading } = useQuery({
    queryKey: ['getcategories'],
    queryFn: getAllBrands
  });

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="container py-2 mt-5">
      <div className="row">
        <h2 className="fs-3 ps-5 fw-bolder text-gray mt-5 ">All Brands</h2>

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
          data?.data?.map((brand) => (
            <div key={brand._id} className="col-md-3 p-4">
              <div 
                className="category rounded-3 cursor-pointer h-100  p-3"
                onClick={() => openModal(brand)}
                // style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <img className="w-100 h-75 object-fit-cover rounded" src={brand.image} alt={brand.name} />
                <p className="fs-5 fw-semibold text-main pt-3 ps-2">{brand.name}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for brand details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            background: "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.7))", // تدرج لوني حول النافذة
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: '50%',
            height: '55vh',
            maxWidth: '300px',
            maxHeight: '300px',
            margin: 'auto',
            padding: '10px',
            borderRadius: '10px',
            textAlign: 'center',
            background: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            border: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column', // ترتيب عمودي
            alignItems: 'center', // توسيط العناصر
            justifyContent: 'center', // منع الفراغات الزائدة
            gap: '15px', // مسافة مناسبة بين العناصر
          }
        }}
      >
        {selectedBrand && (
          <div className=' align-content-center justify-content-center '>
            <button onClick={closeModal} className="btn btn-close position-absolute top-0 end-0 m-3 "></button>
        <div className=' '>
        <h2 className="fw-bold text-main align-content-center fs-5 ">{selectedBrand.name}</h2>
        <img className="w-50 mt-3 align-content-center  " src={selectedBrand.image} alt={selectedBrand.name} />
      
        </div>
       
          </div>
        )}
      </Modal>
    </div>
  );
}

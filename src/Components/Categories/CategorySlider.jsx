import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from "react-slick"; // تأكد من استيراد Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        appendDots: dots => (
          <ul style={{ margin: "0px" }}>
            {dots.slice(0, 2)} {/* Only render the first 2 dots */}
          </ul>
        ),
       
      };
         

  function getCategorySlider(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  let{data}= useQuery({
    queryKey: ['categoryslider'],
    queryFn:getCategorySlider
  })
    
  return (
    <>
      <div className="container py-2 mt-5 text-center">
        <h2 className="fs-3 ps-3 fw-bolder text-gray mt-5">Featured Products</h2>
        {data?.data?.data ? (
          <Slider {...settings}>
            {data.data.data.map((category) => (
              <div key={category._id} className="">
                <img className="w-100 my-3 object-fit-cover" height={200} src={category.image} alt={category.name} />
                <div className="mb-3 nav-link fw-semibold category-name">
                  {category.name.split(" ").map((word, index) =>
                    index === 1 ? (
                      <span key={index} className="d-block">{word}</span> // بدلًا من <br />
                    ) : (
                      <span key={index}> {word} </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </>
  );
  
}
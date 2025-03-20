import React from 'react'
import Slider from "react-slick"; // تأكد من استيراد Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-2.jpeg'

import slider4 from '../../Assets/images/grocery-banner.png'
import slider5 from '../../Assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        arrows :false,
        slidesToScroll: 1,
        autoplay:true
      };
         
  return   <>
    <div className="container mt-5">
        <div className="row gx-0 ">
        <div className="col-md-9 mt-5  ">
     <Slider {...settings}> 
        
            <img src={slider1} className='w-100 rounded-1' height={400}  alt="sliderimage" />
            <img src={slider2} className='w-100 rounded-1' height={400}  alt="sliderimage2" />
            <img src={slider3} className='w-100 rounded-1'height={400}  alt="sliderimage3" />
  
       </Slider> 
       </div>
       <div className="col-md-3 mt-5 ">
       <img src={slider4} className='w-100 ' style={{ height:200 ,objectFit: "cover"}}  alt="sliderimage4" />
       <img src={slider5} className='w-100 ' style={{ height:200 }}  alt="sliderimage5" />
       </div>
       </div>
       </div>
       
  </>
}

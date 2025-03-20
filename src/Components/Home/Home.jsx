// import React, { useEffect, useState } from 'react'
// import axios  from 'axios'

// export default function Home() {
 
//   const [trendingMovies, setTrendingMovies] = useState([]);

//   async function getMoives(){

//   let response=await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50`)

//  setTrendingMovies(response.data.results);
  
//     // console.log(response.data);
    
//   }



//  useEffect(()=>{


//    getMoives();
   
 


//  }

//  ,[])

//     return <>
  
  
  
//    <div className='row'>
//     {trendingMovies.map((moive)=> <div key={moive.id} className='col-md-3 pt-3'>
//       <img className='w-100 bg-dark' src={'https://image.tmdb.org/t/p/w500/'+moive.poster_path} alt="" />
//       <h2 className='h6'>{moive.title}</h2>
//     </div>)}

//    </div>
  
  
  
  
  
  
  
//     </>
// }

import React from 'react'

import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../Categories/CategorySlider';
import MainSlider from '../Categories/MainSlider';


 
 

export default function Home() {

 
  return <>
     <MainSlider/>
     <CategorySlider/>
     < FeaturedProducts/>
    </>
    
}

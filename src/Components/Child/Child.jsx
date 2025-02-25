// import { Component } from 'react';

// export default class Child extends Component {
//   render() {
   
//     let  { id, code, price, onSale, count}= this.props.product;



//     return (
//       <>
//         <div className="col-lg-3 bg-white g-3 text-dark p-1  m-1">

//        <h2>id:{id} </h2>
//        <h2>code:{code} </h2>
//        <h2>price:{price} </h2>
//        <h2>count:{count} </h2>
//         <h2>{onSale? 'sale':'no sale'} </h2>
//         <button className='btn btn-primary w-100 ' onClick={()=>this.props.deleteP(id)}>Delete</button>
//         <button className='btn btn-primary w-100 mt-1 ' onClick={()=>this.props.pCount(this.props.productindex,1)}>plus</button>
//         <button className='btn btn-primary w-100 mt-1 ' onClick={()=>this.props.pCount(this.props.productindex,-1)}>minus</button>
         
    


//         </div>
//       </>
//     );
//   }
// }


import React from 'react'

export default function Child() {
  return (
    <div className='bg-danger text-white'>i am the child</div>
  )
}

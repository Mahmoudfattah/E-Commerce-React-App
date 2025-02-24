// import { Component } from 'react'
// import Child from '../Child/Child'

// export default class Parent extends Component {
//   render() {
//     return <>
       
//        <div className='container bg-danger p-5'>
//         <div className="row ">
//           {this.props.arrProducts.map((product,index)=>(<Child  deleteP={this.props.deleteP}   pCount={this.props.pCount}  productindex={index}    product={product} key={index}    />))}
//         </div>
//        </div>
      


    
   
    
//     </>
//   }
// }


import React from 'react'

export default function Parent() {
  return (
    <div className='bg-danger text-white'>i am the parent</div>
  )
}

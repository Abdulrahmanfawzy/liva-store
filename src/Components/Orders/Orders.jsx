import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../../Context/UserContext';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import Style from '../Products/Products.module.css'

export default function Orders() {
  let [items , setItems] = useState(null);
  let {getOrders} = useContext(userContext);
  let {userid} = useParams();
  let {data , isSuccess , isLoading} = useQuery("allOrders" , ()=>getOrders(userid));
  function allOrderFun(){
    if(isSuccess){
      setItems(data.data)
      console.log(data);
    }
  }

  function handleDate(dateStr){

  // Create a Date object from the date string
  const dateObj = new Date(dateStr);

  // Define an array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get the components of the date
  const year = dateObj.getUTCFullYear();
  const month = monthNames[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate();

  // Format the date as "Month Day, Year"
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate
  }



  useEffect(()=>{
    allOrderFun()
  },[data,isSuccess])
  
  if(isLoading){
    return <div className={Style.loading}>
      <BallTriangle
        height={70}
        width={70}
        radius={5}
        color="#fff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </div>
  }
  return (
    <div style={{marginTop: "100px"}}>
      <div className='container my-5'>
        <h2 className='mb-4 text-center'>My Orders ({items?.length})</h2>
        <div className='row'>
          {items?items.map((item,index)=><div className='mb-5 rounded-2 border border-bottom pt-3 pb-5 w-100 pb-5' key={index}>
            <section style={{fontSize: "17px"}} className='mb-1 mt-2'> <span style={{color: "#acaaa6"}}>Order number:</span> <strong>{index+1}</strong></section>
            <div className='d-md-flex mb-2 justify-content-between'>
              <section className='mb-2' style={{fontSize: "17px"}}><span style={{color: "#acaaa6"}}>Order date:</span> <strong>{handleDate(item.createdAt)} </strong></section>
              <section className='text-success'>
                <span><i className="fa-solid fa-plane-up"></i></span> The order is on the way
              </section>
            </div>
            {item.cartItems.map((element,elIndex)=><div className='border d-md-flex align-items-center mb-2 rounded-3 px-3 px-md-4 p-2' key={elIndex}>
              <div className='text-center'>
                <img style={{width: "130px"}} src={element.product.imageCover} alt="" />
              </div>
              <div className='w-100'>
                <div className='d-flex mb-2 w-100 justify-content-between'>
                  <h5 className='w-75 mb-0'>{element.product.title}</h5>
                  <section style={{whiteSpace: "nowrap"}}><strong>{element.price}.00 EGP</strong></section>
                </div>
                <div className='d-md-flex w-100 justify-content-between'>
                  <section style={{color: "#acaaa6"}}>{element.product.category.name} <span className='mx-md-2'>|</span> {element.product.brand.name}</section>
                  <section style={{color: "#acaaa6"}}>Qty: <strong>{element.count}</strong></section>
                </div>
              </div>
            </div>)}
      
            <div className="row border-top pt-3 mx-1 mt-4">
              <div className="col-md-6">
                <h3 className='h5'>Payment</h3>
                <section style={{fontSize: "18px"}}><span style={{color: "#acaaa6"}}>Method: </span><strong>{item.paymentMethodType.toUpperCase()}</strong></section>
                <section><span style={{fontSize: "18px",color: "#acaaa6"}}>Total Order Price:</span>  <strong className='ms-2 fs-6'>{item.totalOrderPrice}.00 EGP</strong></section>
              </div>
              <div className="col-md-6 mt-3">
                <h3 className='h5'>Delivery</h3>
                <section>Address</section>
                <section style={{fontSize: "18px",color: "#acaaa6"}}>{item.shippingAddress.details}</section>
                <section style={{fontSize: "18px",color: "#acaaa6"}}>{item.shippingAddress.phone}</section>
                <section style={{fontSize: "18px",color: "#acaaa6"}}>{item.shippingAddress.city}</section>
              </div>
            </div>
            
          </div>)
          :""}
        </div>
      </div>
    </div>
  )
}

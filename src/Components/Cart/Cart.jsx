import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Style from '../Products/Products.module.css'
import { BallTriangle } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
  let token = window.localStorage.getItem("userToken");
  let {getCartItems , numberOfCart , setNumberOfCart , deleteCartItem , updateCount} = useContext(cartContext);
  let [items , setItems] = useState(false);
  let [userid , setUserId] = useState(null);
  let [removeLoader , setRemoveLoader] = useState(false);
  let [plusLoader , setPlusLoader] = useState(false);
  let [minusLoader , setMinusLoader] = useState(false);
  let [cartNumber , setCartNumber] = useState(false);
  let [cartTotal , setCartTotal] = useState(false);

  let {data , isSuccess, isLoading , isError} = useQuery("cartItems" , getCartItems);

  async function assetsOfCart(){
      
      if(isSuccess){
        console.log(data);
        if(userid){
          window.localStorage.setItem("userid",userid);
        }
        setUserId(data?.data?.data.cartOwner);
        setItems(data?.data?.data);
        setCartTotal(data?.data?.data?.totalCartPrice);
        setCartNumber(data?.data?.numOfCartItems);
      }
  }

  useEffect(()=>{
    assetsOfCart();
    // console.log(userid);
  },[data,isError,userid])

  async function deleteItem(id){
    setRemoveLoader(id);
    let {data} = await deleteCartItem(id);
    if(data){
      if(data.status == "success"){
        setCartTotal(data.data.totalCartPrice);
        setCartNumber(data.numOfCartItems);
        setNumberOfCart(numberOfCart - 1)
        toast.success("Product removed successfully From Cart");
        setItems(data.data);
        setRemoveLoader(null);
      }
    }
  }

  async function updateCountItemIncreament(id , num){
    setPlusLoader(id);
    let count = num + 1;
    let {data} = await updateCount(id , count);
    if(data){
      if(data.status == "success"){
        toast.success("Product quantity is updated");
        setItems(data.data);
        setPlusLoader(null);
        setCartTotal(data.data.totalCartPrice)
      }
    }
  }

  async function updateCountItemDecrement(id , num){
    setMinusLoader(id);
    let count = num - 1;
    let {data} = await updateCount(id , count);
    if(data){
      if(data.status == "success"){
        toast.success("Product quantity is updated");
        setItems(data.data);
        setMinusLoader(null);
        setCartTotal(data.data.totalCartPrice)
      }
    }
  }
  
  function clearAllItems(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers: {
        token
      }
    })
    .then(res=>{
      if(res.data.message == "success"){
        setItems(null);
        setCartNumber("0");
        setCartTotal("0");
        setNumberOfCart("0")
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

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
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div>
        <img style={{height: "60vh",objectPosition: "top"}} className='w-100 vh-50 d-block object-fit-cover' src={require("../../assets/imgs/slide-home3-1-55.jpg")} alt="" />
      </div>
      <div className="container mt-5 mb-5">
        <div className='p-3 border d-flex justify-content-between'>
          <h2 className='mb-0 h3 ms-3'>SHOPPING CART</h2>
          {items?.products?.length > 0?
          <button onClick={clearAllItems} className='btn btn-danger me-3'>
            Remove All <i className="fa-regular fa-trash-can fs-6"></i>
          </button>
          
          :""}
          
        </div>
        
        {items ? items.products.map((item,index)=>
        <div className='row border overflow-x-auto p-2 m-0 mb-2 align-items-center' key={index}>
            <div className='col-md-2'>
              <img className='w-100 d-block' src={item.product.imageCover} alt="" />
            </div>
            <div className='col-md-6'>
              <h4>{item.product.title}</h4>
              <h5>{item.price}.00 EGP</h5>
            </div>
            <div className='d-flex my-2 justify-content-between col-md-4'>
              <div >
                <button disabled={item.count == 1 ? true : false} onClick={()=>updateCountItemDecrement(item.product.id , item.count)} className='btn btn-light fs-3 py-0 px-3'>
                {minusLoader == item.product.id?<Loading color="#000"/>:"-"}
                </button>
                <span className='px-3'><strong>{item.count}</strong></span>
                <button onClick={()=>updateCountItemIncreament(item.product.id , item.count)} className='btn btn-light fs-3 py-0 px-3'>
                  {plusLoader == item.product.id?<Loading color="#000"/>:"+"}
                </button>
              </div>
              <div className='text-end text-md-end'>
                <button onClick={()=>deleteItem(item.product.id)} className='btn btn-danger'>
                  {removeLoader == item.product.id?<Loading color="#fff"/>
                  : <i className="fa-regular fa-trash-can fs-6"></i>}
                </button>
              </div>
            </div>
        </div>):""}
        
        {items?.products?.length > 0 ?<div className="total mb-5 border w-50 p-3 mt-4">
          {/* {setUserId(items._id)} */}
          <section className='d-flex justify-content-between align-items-center'>
              <span><strong>{cartNumber?cartNumber:""}</strong> Items</span>
              <span><strong>{cartTotal?cartTotal:""}</strong> EGP</span>
          </section>
          <section className='d-flex mt-2 justify-content-between align-items-center'>
              <span>Shipping</span>
              <span><strong>0</strong> EGP</span>
          </section>
          <section className='d-flex mt-2 justify-content-between align-items-center'>
              <span>Total</span>
              <span><strong>{cartTotal?+cartTotal : ""}</strong> EGP</span>
          </section>
          <div className='mt-3'>
            <Link to={`/shipping/${items._id}?method=online`}><button className='btn btn-outline-dark me-3'>Online Payment</button></Link>
            <Link to={`/shipping/${items._id}?method=cash`}>
              <button className='btn btn-dark'>Cash on delivery</button>
            </Link>
          </div>
          </div>
        :
        <div className='text-center w-75 m-auto'>
          <h4 className='mt-5'>There are no items in your cart !</h4>
          <img className='w-50' src={require("../../assets/imgs/shopping.png")} alt="" />  
        </div>}

      </div>
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from 'react-query';
import Style from '../Products/Products.module.css'
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  let {getWishlistItems} = useContext(cartContext);
  let [items , setItems] = useState(false);
  let [itemsArray , setItemsArray] = useState([]);
  let [removeLoader , setRemoveLoader] = useState(false);
  let [cartLoading , setCartLoading] = useState(false);
  let {addToCartFun , setNumberOfWishlist , numberOfWishlist , setNumberOfCart , deleteWishlistItem} = useContext(cartContext);
  let {data , isSuccess , isLoading} = useQuery("wishlist" , getWishlistItems);

  async function assetsOfWishlist(){
    if(isSuccess){
      setItems(data.data.data);
    }
  }

  useEffect(()=>{
    assetsOfWishlist()
  },[data,isSuccess])

  async function handleAddToCart(id){
    setCartLoading(id);
    let result = await addToCartFun(id);
    if(result.data?.status == "success"){
      setNumberOfCart(result.data.numOfCartItems)
      toast.success('Product added successfully.');
      setCartLoading(false);
    }else{
      toast.error(result.response.data.message)
      setCartLoading(false)
    }
  }

  function getSpecificProduct(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>data.data)
    .catch(err=>err);
  }

  async function deleteItem(id,ind){
    setRemoveLoader(id);
    let {data} = await deleteWishlistItem(id);
    if(data){
      if(data.status == "success"){
        let newArr = await Promise.all(data.data.map(async (element)=>{
          let resultData = await getSpecificProduct(element);
          return resultData
        }
        ))
        let dataWishlist = JSON.parse(window.localStorage.getItem("wishlistItems"));
        dataWishlist?.splice(ind , 1);
        window.localStorage.setItem("wishlistItems",JSON.stringify(dataWishlist))
        setItems(newArr);
        setNumberOfWishlist(numberOfWishlist - 1)
        toast.success("Product removed successfully From Wishlist");
        setRemoveLoader(null);
      }
    }
  }

  if(isLoading){
    return <div className={Style.loading}>
      <Loading color="#FFF"/>
    </div>
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div>
        <img style={{height: "60vh",objectPosition: "top"}} className='w-100 vh-50 d-block object-fit-cover' src={require("../../assets/imgs/slide-home3-1-55.jpg")} alt="" />
      </div>
      
      <div className="container mt-5 mb-5">
        <div className='p-3 border d-flex justify-content-between'>
          <h2 className='mb-0 h3 ms-3'>My Wishlist</h2>
        </div>
        {items.length > 0?
        
        <div className="table-responsive mt-3">
          <table className="table text-center">
            <thead className="border my-3" style={{verticalAlign: "middle"}}>
              <th className="text-start ps-3">Product</th>
              <th></th>
              <th  style={{whiteSpace: 'nowrap'}}>Unit Price</th>
              <th style={{whiteSpace: 'nowrap'}}>Stock Status</th>
              <th>View</th>
              <th>Cart</th>
            </thead>
            <tbody>

            {items ? items.map((item,index)=>
            <tr style={{verticalAlign: "middle"}} className='border p-2 m-0 mb-2' key={index}>
              <td style={{width: "100px"}} className="text-center">
                <img className='w-100 d-block' src={item.imageCover} alt="" />
              </td>
              
              <td>
                <h4 style={{width: "250px"}} className="h6 text-start">{item.title}</h4>
              </td>

              <td><strong style={{whiteSpace: 'nowrap'}}>{item.price}.00 EGP</strong></td>
              <td style={{color: "#76bd1c"}}>In Stock</td>
              <td>
                <button style={{whiteSpace: "nowrap"}} className='btn py-2 px-3 rounded-1 btn-dark'>
                  <Link className='text-white text-decoration-none' to={`/productdetails/${item.id}`}>View Product</Link>
                </button>
              </td>

              <td>
                <button style={{whiteSpace: "nowrap"}} onClick={()=>handleAddToCart(item.id)} className='ms-2 py-2 border px-3 btn rounded-1'>{cartLoading == item.id?<Loading color="green"/>:"ADD TO CART"}</button>
              </td>

              <td>
                <button onClick={()=>deleteItem(item.id,index)} className='btn ms-2 btn-danger'>
                    {removeLoader == item.id?<Loading color="#fff"/>
                    : <i className="fa-solid fa-xmark fs-6"></i>}
                </button>
              </td>
              </tr>):<div className='text-center w-75 m-auto'>
                <h4 className='mt-5 mb-4'>There are no items in your Wishlist !</h4>
                <img className='w-50' src={require("../../assets/imgs/no-items-found-clolor.png")} alt="" />  
              </div>}
            </tbody>
          </table>
        </div>
        :<div className='text-center w-75 m-auto'>
        <h4 className='mt-5 mb-5'>There are no items in your Wishlist !</h4>
        <img className='w-50' src={require("../../assets/imgs/no-items-found-clolor.png")} alt="" />  
      </div>}
      </div>

    </>
  )
}

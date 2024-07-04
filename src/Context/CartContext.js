import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let cartContext = createContext();

export default function CartContextProvider({children}) {
  let token = window.localStorage.getItem("userToken");
  let [numberOfCart , setNumberOfCart] = useState(null);
  let [numberOfWishlist , setNumberOfWishlist] = useState(null);
  let [cartId , setCartId] = useState(null);
  let wishListArr;

  if(window.localStorage.getItem("wshlistItemChecked")){
    wishListArr = JSON.parse(window.localStorage.getItem("wshlistItemChecked"));
  }else{
    wishListArr = [];
  }
  let navigate = useNavigate();
  
  function getCartItems(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers: {
        token
      }
    })
    .then (res=>res)
    .catch(err=>err)
  }

  function getWishlistItems(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers: {
        token
      }
    })
    .then (res=>res)
    .catch(err=>err)
  }

  function checkWishlistIcon(id){
    // wishListArr.push(id);
    // window.localStorage.setItem("wshlistItemChecked",JSON.stringify(wishListArr));
  }

  useEffect(()=>{
    let data = getCartItems().then(({data})=>{
      if(data){
        setCartId(data.data._id);
        setNumberOfCart(data.numOfCartItems);
      }
    })
    let result = getWishlistItems().then(({data})=>{
      if(data){
        setNumberOfWishlist(data.count)
      }
    })
  },[])

  function addToCartFun(productId){
    let token = window.localStorage.getItem("userToken");
    if(token){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId
      } ,{
        headers: {
          token
        } 
      })
      .then((res)=>res)
      .catch((err)=>err)
    }else{
      navigate("/login");
    }
  }

  function addToWishlistFun(productId){
    let token = window.localStorage.getItem("userToken");
    if(token){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId
      } ,{
        headers: {
          token
        } 
      })
      .then((res)=>res)
      .catch((err)=>err)
    }else{
      navigate("/login");
    }
  }

  function deleteCartItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers: {
        token
      }
    })
    .then(res=>res)
    .catch(err=>err)
  }
  function deleteWishlistItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      headers: {
        token
      }
    })
    .then(res=>res)
    .catch(err=>err)
  }

  function updateCount(id , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      count: count
    },{
      headers: {
        token
      }
    })
    .then(res=>res)
    .catch(err=>err)
  }

  return (
    <cartContext.Provider value={{getCartItems , checkWishlistIcon , cartId , deleteWishlistItem , getWishlistItems , setNumberOfWishlist , numberOfWishlist , addToWishlistFun , setNumberOfCart , numberOfCart , addToCartFun , deleteCartItem , updateCount}}>
      {children}
    </cartContext.Provider>
  )
}

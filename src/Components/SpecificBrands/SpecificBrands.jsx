import React, { useContext, useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import Style from "../Products/Products.module.css";
import {BallTriangle} from "react-loader-spinner";
import { cartContext } from '../../Context/CartContext';
import Loading from "../Loading/Loading";
import toast, { Toaster } from 'react-hot-toast';
import { productContext } from '../../Context/ProductsContext';
import { Link } from 'react-router-dom';
import productImage from '../../assets/imgs/productsadded.svg';
import Footer from '../Footer/Footer';

export default function SpecificBrands() {
  let {brandid} = useParams();
  let {brandsFilter} = useContext(productContext);

  let {addToCartFun , setNumberOfWishlist , numberOfCart , addToWishlistFun , setNumberOfCart} = useContext(cartContext);
  let [loader , setLoader] = useState(false);
  let [items , setItems] = useState(null);
  let [cartLoading , setCartLoading] = useState(null);
  let [wishlistLoading , setWishlistLoading] = useState(null);
  
  async function getSpecialCategory(){
    setLoader(true);
    let {data} = await brandsFilter(brandid);
    if(data){
      setItems(data.data);
      setLoader(false);
    }
  }

  async function handleAddToCart(id){
    setCartLoading(id);
    let result = await addToCartFun(id);
    console.log(result);
    if(result.data?.status == "success"){
      setNumberOfCart(result.data.numOfCartItems)
      toast.success('Product added successfully.');
    }else{
      toast.error(result.response.data.message)
      setCartLoading(null);
    }
    setCartLoading(null);
  }

  async function handleAddToWishlist(id){
    setWishlistLoading(id);
    let result = await addToWishlistFun(id);
    console.log(result);
    if(result.data?.status == "success"){
      setNumberOfWishlist(result.data.data.length);
      toast.success('Product added successfully to wishlist.');
      setWishlistLoading(null);
    }else{
      toast.error(result.response.data.message)
      setWishlistLoading(null);
    }
  }

  useEffect(()=>{
    getSpecialCategory()
  },[])

  if(loader){
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
      <div className="position-relative">
        <div className="row text-center">
          {items?.length > 0?
          items.map((item,index)=>
            <div key={index} className="col-md-3 pb-5 mb-3 text-start position-relative">
                <div>
                  <img className='w-100 d-block' src={item.imageCover} alt={item.title} />
                </div>
                <h4>{item.title.split(" ").slice(0,2).join(" ")}</h4>
                <div className='d-flex justify-content-between align-items-center'>
                  <section><strong>{item.price}.00 EGP</strong></section>
                  <span><i className="fa-solid fa-star text-warning me-2"></i>{item.ratingsAverage}</span>
                </div>
                <div className={Style.addCartBtn}>
                  <button onClick={()=>handleAddToCart(item.id)} className='btn btn-success'>
                    {cartLoading == item.id? <Loading color="#fff"/>
                    :"Add To Cart"}
                  </button>
                  <button onClick={()=>handleAddToWishlist(item.id)} className='btn btn-success'>{wishlistLoading == item.id? <Loading color="#fff"/> : "Add To Wishlist"}</button>
                  <Link className='text-dark text-decoration-none' to={`/productdetails/${item.id}`}>View</Link>
                </div>
            </div>
          ): <div className="text-center d-flex flex-column justify-content-center align-items-center vh-100">
              <h3 className="h4">Products of this brand will be added soon</h3>
              <img className="w-75" src={productImage} alt="products will added soon" />
          </div>
          }
        </div>
      </div>
    </div>
    <Footer/>
  </div>
)
}

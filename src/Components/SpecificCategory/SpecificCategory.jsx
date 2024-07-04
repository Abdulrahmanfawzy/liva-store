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
import { Helmet } from 'react-helmet';

export default function SpecificCategory() {
  let {categoryid} = useParams();
  let {categoriesFilter} = useContext(productContext);
  let {addToCartFun , setNumberOfWishlist , numberOfCart , addToWishlistFun , setNumberOfCart} = useContext(cartContext);
  let [loader , setLoader] = useState(false);
  let [items , setItems] = useState(null);
  let [cartLoading , setCartLoading] = useState(null);
  let [wishlistLoading , setWishlistLoading] = useState(null);
  let [wishlistArr, setWishlistArr] = useState([]);

  async function getSpecialCategory(){
    setLoader(true);
    let {data} = await categoriesFilter(categoryid);
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
      const updatedWishlist = [...wishlistArr, id];
      setWishlistArr(updatedWishlist);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
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
  <>
    <Helmet>
        <title>Categories</title>
    </Helmet>
    <div style={{marginTop: "100px"}} className='container mb-5'>
      <div className="position-relative">
      <div className="row">
            {items ? (
              items.map((item, inder) => (
                <div
                  key={inder}
                  className="col-sm-6 col-lg-3 mb-3 text-start position-relative"
                >
                  <div className="cardItem position-relative rounded-2">
                    <div>
                      <img
                        className="w-100 cardItemImg d-block"
                        src={item.imageCover}
                        alt={item.title}
                      />
                    </div>
                    <h4>{item.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <section>
                        <strong>{item.price}.00 EGP</strong>
                      </section>
                      <span>
                        <i className="fa-solid fa-star text-warning me-2"></i>
                        {item.ratingsAverage}
                      </span>
                    </div>

                    <div className="wishlistBtn">
                      {wishlistArr ? (
                        wishlistArr.includes(item.id) ? (
                          <button className="btn">
                            <Link to="/wishlist">
                              {wishlistLoading == item.id ? (
                                <Loading color="#f7931e" />
                              ) : (
                                <i className="fa-solid fa-heart"></i>
                              )}
                            </Link>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToWishlist(item.id)}
                            className="btn"
                          >
                            {wishlistLoading == item.id ? (
                              <Loading color="#f7931e" />
                            ) : (
                              <i className="fa-regular fa-heart"></i>
                            )}
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => handleAddToWishlist(item.id)}
                          className="btn"
                        >
                          {wishlistLoading == item.id ? (
                            <Loading color="#f7931e" />
                          ) : (
                            <i className="fa-regular fa-heart"></i>
                          )}
                        </button>
                      )}
                    </div>
                    <div
                      className={`${Style.addCartBtn} position-relative pb-5 mt-3`}
                    >
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="btn basketBtn"
                      >
                        {cartLoading == item.id ? (
                          <Loading color="#f7931e" />
                        ) : (
                          <i className="fa-solid fa-basket-shopping"></i>
                        )}
                      </button>

                      <button className="btn eyeBtn">
                        <Link
                          className="text-decoration-none"
                          to={`/productdetails/${item.id}`}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loading color="#FFF" />
            )}
          </div>
      </div>
    </div>

    <Footer/>
  </>
)
}

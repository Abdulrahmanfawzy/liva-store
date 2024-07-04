import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomPaging from "./SliderImages";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import Style from "../Products/Products.module.css";
import { Helmet } from "react-helmet";
import { RotatingLines } from "react-loader-spinner";

export default function ProductDetails() {
  let { productid } = useParams();
  let [product, setProduct] = useState(null);
  let [cartLoading, setCartLoading] = useState(false);
  let [wishlistLoading, setWishlistLoading] = useState(null);

  let {
    addToCartFun,
    addToWishlistFun,
    setNumberOfWishlist,
    numberOfCart,
    setNumberOfCart,
  } = useContext(cartContext);

  function getSpecificProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productid}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getSpecificProduct();
  }, []);

  // if(product){
  //   return <div className={Style.loading}>
  //     <Loading color="#FFF"/>
  //   </div>
  // }

  async function handleAddToCart(id) {
    setCartLoading(true);
    let result = await addToCartFun(id);
    if(result){
      if (result.data?.status == "success") {
        setNumberOfCart(result.data.numOfCartItems);
        toast.success("Product added successfully.");
        setCartLoading(false);
      } else {
        toast.error(result.response.data.message);
        setCartLoading(false);
      }
    }
  }

  async function handleAddToWishlist(id) {
    setWishlistLoading(id);
    let result = await addToWishlistFun(id);
    if(result){
      if (result.data?.status == "success") {
        setNumberOfWishlist(result.data.data.length);
        toast.success("Product added successfully to wishlist.");
        setWishlistLoading(null);
      } else {
        toast.error(result.response.data.message);
        setWishlistLoading(null);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{product?.title}</title>
      </Helmet>
      <div style={{marginTop: "100px"}} className="container mb-5 productDetails">
        {product ? (
          <div className="row mt-5">
            <div className="col-md-6">
              <CustomPaging
                baseImg={product.imageCover}
                title={product?.title}
                imgChanges={product.images}
              />
            </div>
            <div className="col-md-6 mt-5">
              <section>{product?.brand?.name}</section>
              <h2>{product.title}</h2>
              <section className="my-3 d-flex align-items-center">
                <span>
                  <i className="fa-solid fa-fire-flame-curved me-2 text-success"></i>
                  <strong>{product.sold} Sold</strong>
                </span>
                <span className="ms-5">
                  <i className="fa-brands fa-product-hunt text-success me-2"></i>
                  {product.category.name}
                </span>
              </section>
              <h4 className="mb-2">{product.price}.00 EGP</h4>
              <section>
                {" "}
                <span
                  className="text-white d-inline-block my-2"
                  style={{
                    background: "#F67280",
                    padding: "5px 10px",
                    fontSize: "13px",
                  }}
                >
                  Hurry, Only {product.quantity} left!
                </span>
              </section>
              <section>{product.description}</section>
              <section className="mt-2">
                Rating: <i className="fa-solid fa-star text-warning me-1"></i>
                <strong>{product.ratingsAverage}</strong>
              </section>
              <div className="d-flex my-3 align-items-center">
                <div className="count d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="px-5 py-2 d-block bg-outline-dark border btn rounded-1"
                  >
                    {wishlistLoading == product.id ? (
                      <Loading />
                    ) : (
                      "Add To Wishlist"
                    )}
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="text-white ms-3 w-50 py-2 d-block bg-dark btn rounded-1"
                >
                  {cartLoading ? <Loading color="#fff" /> : "ADD TO CART"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={Style.loading}>
            <RotatingLines
                visible={true}
                height="35"
                width="35"
                strokeColor= "gold"
                color="gold"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
          </div>
        )}
      </div>

      <Footer/>
    </>
  );
}

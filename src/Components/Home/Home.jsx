import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { productContext } from "../../Context/ProductsContext";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Style from "./Home.module.css";
import StyleProduct from "../Products/Products.module.css";
import { BallTriangle, RotatingLines } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
let arr = [];

export default function Home() {

  let [loader, setLoader] = useState(false);
  let [filterLoading, setFilterLoading] = useState(false);
  let [items, setItems] = useState(null);
  let [cartLoading, setCartLoading] = useState(null);
  let [wishlistLoading, setWishlistLoading] = useState(false);
  let [categories, setCategories] = useState(null);
  let [brands, setBrands] = useState(null);
  let [firstItems, setFirstItems] = useState(null);
  let [secondItems, setSecondItems] = useState(null);
  let [wishlistCheckClicked, setWishlistCheckClicked] = useState(false);
  let [wishlistArr, setWishlistArr] = useState([]);
  let [activeBrand, setActiveBrand] = useState(false);

  let { getAllProductsForHome, getAllCategories, getAllBrands } =
    useContext(productContext);
  let {
    addToCartFun,
    checkWishlistIcon,
    setNumberOfWishlist,
    numberOfCart,
    addToWishlistFun,
    setNumberOfCart,
  } = useContext(cartContext);

  let firstSection = useQuery("firstSection", getAllProductsForHome);

  async function handleAddToCart(id) {
    setCartLoading(id);
    let result = await addToCartFun(id);
    if(result){
      if (result.data?.status == "success") {
        setNumberOfCart(result.data.numOfCartItems);
        toast.success("Product added successfully.");
      } else {
        toast.error(result.response.data.message);
        setCartLoading(null);
      }
      setCartLoading(null);
    }
  }

  async function handleAddToWishlist(id) {
    setWishlistLoading(id);
    let result = await addToWishlistFun(id);
    if (result) {
      if (result.data?.status == "success") {
        setNumberOfWishlist(result.data.data.length);
        // setNumberOfCart(result.data.numOfCartItems)
        toast.success("Product added successfully to wishlist.");
        setWishlistLoading(null);
        const updatedWishlist = [...wishlistArr, id];
        setWishlistArr(updatedWishlist);
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      } else {
        toast.error(result.response.data.message);
        setWishlistLoading(null);
      }
    }
  }

  function firstProductsInHome() {
    if (firstSection.isSuccess) {
      setFirstItems(firstSection.data.data.data);
    }
  }

  function getAllcheckedWhishlist() {
    let allIcons = JSON.parse(window.localStorage.getItem("wishlistItems")) || [];
    setWishlistArr(allIcons);
  }

  useEffect(() => {
    getAllcheckedWhishlist();
  }, []);

  useEffect(() => {
    firstProductsInHome();
    brandsFilterFun("category[in]", "6439d58a0049ad0b52b9003f");
  }, [firstSection.data, firstSection.isLoading]);

  function brandsFilterFun(key, id) {
    setActiveBrand(id);
    setFilterLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?${key}=${id}`)
      .then((res) => {
        setFilterLoading(false);
        if (res?.data.data.length > 0) {
          setSecondItems(res?.data.data);
        }
      })
      .catch((err) => err);
  }

  if (firstSection.isLoading) {
    return (
      <div className={StyleProduct.loading}>
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
    );
  }

  let settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // if(filterLoading){
  //   return <div className={StyleProduct.filterLoader}>
  //     <i style={{fontSize: "20px"}} className="fa-solid fa-spinner fa-spin"></i>
  //   </div>
  // }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Slider className={Style.homeSlider} {...settings}>
        <div className="position-relative">
          <img
            className="w-100 vh-100 object-fit-cover d-block"
            src={require("../../assets/imgs/slide-home3-1-55.jpg")}
            alt="Slider men wearing"
          />
          <div className={`${Style.content}`}>
            <section>Introducting</section>
            <h2>Women's Collection</h2>
            <p>
              Unique Clothes For special occasions, with special prices take{" "}
              <br /> your adventure now
            </p>
            <Link
              className="btn bg-dark text-white rounded-1 py-2 px-3"
              to="/products"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="position-relative">
          <img
            className="w-100 vh-100 object-fit-cover d-block"
            src={require("../../assets/imgs/slide-home3-3-516.jpg")}
            alt="Slider men wearing"
          />
          <div className={`${Style.content2}`}>
            <section>Introducting</section>
            <h2>Men's Collection</h2>
            <p>
              Unique Clothes For special occasions, with special prices take{" "}
              <br /> your adventure now
            </p>
            <Link
              className="btn bg-dark text-white rounded-1 py-2 px-3"
              to="/products"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Slider>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-2">
            <div className="row">
              <div className="col-4 text-center">
                <i
                  style={{ color: "#f7931e" }}
                  className="fa-solid fa-ship fs-1"
                ></i>
              </div>
              <div className="col-8">
                <h4 className="fs-6 mb-1">Free Delivery</h4>
                <section style={{ fontSize: "15px" }}>
                  Free shipping on all order
                </section>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-2">
            <div className="row">
              <div className="col-4 text-center">
                <i
                  style={{ color: "#f7931e" }}
                  className="fa-solid fa-phone-volume fs-1"
                ></i>
              </div>
              <div className="col-8">
                <h4 className="fs-6 mb-1">Online Support 24/7</h4>
                <section style={{ fontSize: "15px" }}>
                  Support online 24 hours a day
                </section>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-2">
            <div className="row">
              <div className="col-4 text-center">
                <i
                  style={{ color: "#f7931e" }}
                  className="fa-solid fa-money-check-dollar fs-1"
                ></i>
              </div>
              <div className="col-8">
                <h4 className="fs-6 mb-1">Money Return</h4>
                <section style={{ fontSize: "15px" }}>
                  Back guarantee under 7 days
                </section>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-2">
            <div className="row">
              <div className="col-4 text-center">
                <i
                  style={{ color: "#f7931e" }}
                  className="fa-brands fa-product-hunt fs-1"
                ></i>
              </div>
              <div className="col-8">
                <h4 className="fs-6 mb-1">Member Discount</h4>
                <section style={{ fontSize: "15px" }}>
                  Onevery order over $120.00
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="d-flex mb-2 justify-content-between">
            <h5 className="mb-2">Don't miss this week's sales</h5>
            <Link className="text-dark text-decoration-none" to="/products">
              View All{" "}
              <span className="ms-1">
                <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </Link>
          </div>

          <div className="row">
            {firstItems ? (
              firstItems.map((item, inder) => (
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

        <div className="mb-5">
          <img
            className="w-100 bannerImg d-block"
            src={require("../../assets/imgs/homebanner.webp")}
            alt=""
          />
        </div>

        <div>
          <div className="d-flex best_seller justify-content-between">
            <h4>Best Sellers</h4>
            <div className="d-flex gap-3">
              <section className={`${activeBrand == "6439d58a0049ad0b52b9003f" ?"active_brand":""}`}
                onClick={() =>
                  brandsFilterFun("category[in]", "6439d58a0049ad0b52b9003f")
                }
                style={{ cursor: "pointer" }}
              >
                Women's Fashion
              </section>
              <section className={`${activeBrand == "6439d5b90049ad0b52b90048"?"active_brand":""}`}
                onClick={() =>
                  brandsFilterFun("category[in]", "6439d5b90049ad0b52b90048")
                }
                style={{ cursor: "pointer" }}
              >
                Men's Fashion
              </section>
              <section className={`${activeBrand == "64089aa924b25627a2531576"?"active_brand":""}`}
                onClick={() =>
                  brandsFilterFun("brand", "64089aa924b25627a2531576")
                }
                style={{ cursor: "pointer" }}
              >
                TVS
              </section>
              <section className={`${activeBrand == "64089fe824b25627a25315d1"?"active_brand":""}`}
                onClick={() =>
                  brandsFilterFun("brand", "64089fe824b25627a25315d1")
                }
                style={{ cursor: "pointer" }}
              >
                Canon
              </section>
            </div>
          </div>
          <div className="row">
            {secondItems ? (
              secondItems.map((item, inder) => (
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

        <div className="mt-5">
          <div className="row">
            <div className="col-md-6 mb-2 position-relative">
              <img
                className="w-100 rounded-1 d-block"
                src={require("../../assets/imgs/control1.jpg")}
                alt=""
              />
              <div className="position-absolute top-50 translate-middle-y">
                <h3 className="text-center fs-4 text-white ms-3">
                  Best game <br /> <span className="fs-1">Controllers</span>
                </h3>
              </div>
            </div>
            <div className="col-md-3 mb-2 position-relative">
              <img
                className="w-100 rounded-1 d-block"
                src={require("../../assets/imgs/control2.jpg")}
                alt=""
              />
              <div className="position-absolute top-50 translate-middle-y">
                <h5 className="text-center fs-4 text-dark ms-3">
                  Best Pods <br /> <span className="fs-3">Controllers</span>
                </h5>
              </div>
            </div>
            <div className="col-md-3 mb-2 position-relative">
              <img
                className="w-100 rounded-1 d-block"
                src={require("../../assets/imgs/control3.jpg")}
                alt=""
              />
              <div className="position-absolute top-50 translate-middle-y">
                <h5 className="text-center fs-4 text-light ms-3">
                  Best Audio <br /> <span className="fs-3">Controllers</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

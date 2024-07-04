import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import Style from "./Products.module.css";
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import Loading from "../Loading/Loading";
import toast, { Toaster } from 'react-hot-toast';
import { productContext } from '../../Context/ProductsContext';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function ProductPagination({num}) {
  let [loader , setLoader] = useState(false);
  let [filterLoading , setFilterLoading] = useState(false);
  let [items , setItems] = useState(null);
  let [cartLoading , setCartLoading] = useState(null);
  let [wishlistLoading , setWishlistLoading] = useState(null);
  let [categories , setCategories] = useState(null);
  let [brands , setBrands] = useState(null);
  let [cartBtnContent , setCartBtnContent] = useState("Add To Cart");
  let [wishlistArr, setWishlistArr] = useState([]);

  let {addToCartFun , setNumberOfWishlist , numberOfCart , addToWishlistFun , setNumberOfCart} = useContext(cartContext);
  let {getAllProducts,getAllCategories,getAllBrands} = useContext(productContext);
  
  let {data , isSuccess} = useQuery("products" , getAllProducts);
  let allCategories = useQuery("categoriesInProducts" , getAllCategories);
  let allBrands = useQuery("BrandsInProducts" , getAllBrands);

  async function handleAddToCart(id){
    setCartLoading(id);
    let result = await addToCartFun(id);
    console.log(result);
    if(result){
      if(result.data?.status == "success"){
        setNumberOfCart(result.data.numOfCartItems)
        toast.success('Product added successfully.');
        setCartBtnContent("View Cart");
      }else{
        toast.error(result.response.data.message)
        setCartLoading(null);
      }
      setCartLoading(null);
    }
  }

  async function handleAddToWishlist(id){
    setWishlistLoading(id);
    let result = await addToWishlistFun(id);
    console.log(result);
    if(result.data?.status == "success"){
      setNumberOfWishlist(result.data.data.length);
      // setNumberOfCart(result.data.numOfCartItems)
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



  function getProducts(pageNum){
    setLoader(true);
    allCategoriesFun();
    allBrandsFun();
    if(isSuccess){
      setItems(data.data.data);
      setLoader(false);
    }
  }
  
  let filterCategory = ["Music","SuperMarket","Baby & Toys","Home","Books","Beauty & Health","Mobiles"];

  function allCategoriesFun(){
    let {data , isSuccess} = allCategories;
    if(isSuccess){
      let allItems = data.data.data.filter(item => !filterCategory.includes(item.name));
      setCategories(allItems);
      console.log(allItems);
    }
  }

  function allBrandsFun(){
    let {data , isSuccess} = allBrands;
    if(isSuccess){
      console.log(data.data.data);
      setBrands(data.data.data);
    }
  }

  function brandsFilterFun(key,id){
    setFilterLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?${key}=${id}`)
    .then(res=>{
      setFilterLoading(false);
      if(res?.data.data.length > 0){
        setItems(res?.data.data)
      }
    })
    .catch(err=>err)
  }

  useEffect(()=>{
    getProducts(1);
  },[data , isSuccess])

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
  if(filterLoading){
      return <div className={Style.filterLoader}>
        <i style={{fontSize: "20px"}} className="fa-solid fa-spinner fa-spin"></i>
      </div>
  }
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div style={{marginTop: "100px"}} className='container mb-5'>
        <div className="row">
      
          <div style={{top: "100px"}} className="col-md-3 position-sticky h-100">
      
            <div>
              <h3 className='mb-3 h5'>Product Categories</h3>
      
              {categories?categories.map((category,index)=>
                  <div key={index}>
                    <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("category[in]",category._id)} className='btn btn-light me-2 mb-2'>
                      {category.name}
                    </button>
                  </div>
              ):""}     
            </div>
      
            <div>
                <h3 className='my-3 h5'>Brands</h3>
                {brands?brands.map((brand,index)=>
                  <div key={index} className='d-inline-block'>
                    <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("brand",brand._id)} className='btn btn-light me-2 mb-2'>
                      {brand.name}
                    </button>
                  </div>
              ):""}    
            </div>
      
            <div>
                <h3 className='my-3 h5'>Sort by price</h3>
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("sort","+price")} className='btn btn-light me-2 mb-2'>
                  Low to high Price
                </button>  
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("sort","-price")} className='btn btn-light me-2 mb-2'>
                  High to low Price
                </button>  
            </div>
      
            <div>
                <h3 className='my-3 h5'>Limit product's count</h3>
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("limit","10")} className='btn btn-light me-2 mb-2'>
                  10
                </button>  
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("limit","20")} className='btn btn-light me-2 mb-2'>
                  20
                </button>  
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("limit","30")} className='btn btn-light me-2 mb-2'>
                  30
                </button>  
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("limit","40")} className='btn btn-light me-2 mb-2'>
                  40
                </button>  
                <button style={{fontSize: "14px"}} onClick={()=>brandsFilterFun("limit","50")} className='btn btn-light me-2 mb-2'>
                  50
                </button>   
            </div>
      
          </div>
          
          <div style={{background: "#FFF"}} className="col-md-9 bg-white z-2">
          <div className="row">
            {items ? (
              items.map((item, inder) => (
                <div
                  key={inder}
                  className="col-sm-6 col-lg-4 mb-3 text-start position-relative"
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
      </div>

      <Footer/>
    </>
  )
}

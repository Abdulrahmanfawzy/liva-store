import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { productContext } from '../../Context/ProductsContext';
import { Link } from 'react-router-dom';
import Style from "../Products/Products.module.css";
import { BallTriangle } from 'react-loader-spinner';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function Categories() {
  let {getAllCategories} = useContext(productContext)
  let {data , isSuccess , isLoading} = useQuery("allCategories" , getAllCategories);
  let [items,setItems] = useState(null);
  function allCategoriesFun(){
    if(isSuccess){
      setItems(data.data.data)
      console.log(data.data.data);
    }
  }

  useEffect(()=>{
    allCategoriesFun();
  },[data, isSuccess])

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
        <title>Categories</title>
      </Helmet>
      <div style={{marginTop: "100px"}} className='mb-5 container'>
        <h2 className='text-center mb-5 text-uppercase'>All Categories</h2>
        <div className='row gy-3'>
          {items?
            items.map((item,index)=><Link to={`${item._id}`} key={index} className='col-md-3 text-decoration-none text-dark text-center'>
              <div>
                <img style={{width: "230px",height: "230px" , objectFit: "cover" , objectPosition: "top"}} className='rounded-circle' src={item.image} alt="" />
              </div>
              <h2 className='h4 mt-2'>{item.name}</h2>
            </Link>)
          :""}
        </div>
      </div>
      <Footer/>
    </>
  )
}

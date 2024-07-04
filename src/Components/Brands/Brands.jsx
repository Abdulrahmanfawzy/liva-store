import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { productContext } from '../../Context/ProductsContext';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import Style from "../Products/Products.module.css";
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function Brands() {
  let {getAllBrands} = useContext(productContext)
  let {data , isSuccess , isLoading} = useQuery("allBrands" , getAllBrands);
  let [items,setItems] = useState(null);
  
  function allBrandsFun(){
    if(isSuccess){
      setItems(data.data.data)
      console.log(data.data.data);
    }
  }

  useEffect(()=>{
    allBrandsFun();
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
        <title>Brands</title>
      </Helmet>
      <div style={{marginTop: "100px"}} className='mb-5 container'>
        <div className='row gy-3'>
          {items?
            items.map((item,index)=><Link to={`${item._id}`} key={index} className='col-md-3 text-decoration-none text-dark text-center'>
              <div>
                <img style={{width: "230px"}} src={item.image} alt="" />
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

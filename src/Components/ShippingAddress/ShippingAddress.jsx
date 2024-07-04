import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import * as Yup from "yup";
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContext';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function ShippingAddress() {
  let [addressSuccess ,setAddressSuccess] = useState(null);
  let [addressFail ,setAddressFail] = useState(null);
  let [loadingAddress , setLoadingAddress] = useState(null);
  let token = window.localStorage.userToken;
  let {setNumberOfCart} = useContext(cartContext);
  let navigate = useNavigate();
  let {cartid} = useParams();
  let [params] = useSearchParams();
  let method = params.get("method");
  let phoneReg = /^01[0125][0-9]{8}$/;


  function onSubmitAdressFun(values){
    setLoadingAddress(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, {
      shippingAddress: values
      } , {
      headers:{
        token
      }
    })
    .then(({data})=>{
      console.log(data);
      if(data.status == "success"){
        setLoadingAddress(false);
        setAddressFail(null);
        setAddressSuccess("Address is added successfully");
        setNumberOfCart(0);
        setTimeout(()=>{
          if(method == "cash"){
            navigate(`/orders/${data.data.user}`)
          }else {
            console.log(data.data);
          }
        },1000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setAddressFail(err.response?.data.message)
      setAddressSuccess(null);
      setLoadingAddress(false);
    })
  }
  let userid = window.localStorage.getItem("userid");
  function onSubmitOnlineMethod(values){
    setLoadingAddress(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000/orders/${userid}`, {
      shippingAddress: values
      } , {
      headers:{
        token
      }
    })
    .then(({data})=>{
      console.log(data);
      if(data.status == "success"){
        setLoadingAddress(false);
        setAddressFail(null);
        setAddressSuccess("Address is added successfully");
        setTimeout(()=>{
          window.location.href = data.session.url;
        },1000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setAddressFail(err.response?.data.message)
      setAddressSuccess(null);
      setLoadingAddress(false);
    })
  }


  //  formik address validation
  let formikAddressValidation = Yup.object({
    details: Yup.string().required("Address details is required *"),
    phone:  Yup.string().matches(phoneReg , "Phone is not valid, accept Egyptian numbers only").required("Phone is required *"),
    city: Yup.string().required("City is required *")
  })

  // Formik address

  let formikAddress = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: formikAddressValidation,
    onSubmit: (method == "cash")? onSubmitAdressFun : onSubmitOnlineMethod
  })

  return (
    <div style={{marginTop: "100px"}}>
      <div className='container my-4'>
        <div className='row align-items-center'>
            <div className="col-md-6">
              <form onSubmit={formikAddress.handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='w-100 mt-5 p-4 m-auto rounded-2'>
                <h2 className='mb-4 h4 text-center'>Shipping Address</h2>
              
                {(addressFail)?
                <div className='alert alert-danger'>{addressFail}</div>:""}
                {(addressSuccess)?
                <div className='alert alert-success'>{addressSuccess}</div>:""}
              
                <div className='mb-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <label htmlFor="details">Details:</label>
                    <input style={{width: "85%" , color: "#acaaa6"}}  value={formikAddress.values.details} onChange={formikAddress.handleChange} onBlur={formikAddress.handleBlur} type="text" className='form-control rounded-0' name='details' id='details'/>
                  </div>
                  {(formikAddress.errors.details && formikAddress.touched.details)
                  ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikAddress.errors.details}</div>
                  :""}
                </div>
              
              
                <div className='mb-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <label htmlFor="phoneAddress">phone:</label>
                    <input style={{width: "85%" , color: "#acaaa6"}}  value={formikAddress.values.phone} onChange={formikAddress.handleChange} onBlur={formikAddress.handleBlur} type="text" className='form-control rounded-0' name='phone' id='phoneAddress'/>
                  </div>
                  {(formikAddress.errors.phone && formikAddress.touched.phone)
                  ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikAddress.errors.phone}</div>
                  :""}
                </div>
              
                <div className='mb-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <label htmlFor="cityAddress">city:</label>
                    <input style={{width: "85%" , color: "#acaaa6"}}  value={formikAddress.values.city} onChange={formikAddress.handleChange} onBlur={formikAddress.handleBlur} type="text" className='form-control rounded-0' name='city' id='cityAddress'/>
                  </div>
                  {(formikAddress.errors.city && formikAddress.touched.city)
                  ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikAddress.errors.city}</div>
                  :""}
                </div>
      
                <button style={{background:"#845EF2"}} disabled={(formikAddress.isValid && formikAddress.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
                  {loadingAddress
                  ? <Loading color="#fff"/>
                  :"Submit"}
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <img className='w-100 d-block' src={require("../../assets/imgs/shipping.png")} alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

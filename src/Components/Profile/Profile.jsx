import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Profile() {
  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let token = window.localStorage.userToken;
  let [fail ,setFail] = useState(null);
  let [success ,setSuccess] = useState(null);
  let [addressSuccess ,setAddressSuccess] = useState(null);
  let [addressFail ,setAddressFail] = useState(null);
  let [error , setError] = useState(null);
  let [errorPass , setErrorPass] = useState(null);
  let [successPass , setSuccessPass] = useState(null);
  let [loading , setLoading] = useState(null);
  let [loadingAddress , setLoadingAddress] = useState(null);
  let [loadingPass , setLoadingPass] = useState(null);
  let [allAddress , setAllAddress] = useState(null);

  let navigate = useNavigate();

  function submitFun(values){
    console.log(values);
    setLoading(true);
    axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values , {
      headers:{
        token
      }
    })
    .then(({data})=>{
      console.log(data);
      if(data.message == "success"){
        window.localStorage.setItem("userData",JSON.stringify({username:values.name , userEmail: values.email , userPhone: values.phone}));
        setLoading(false);
        setError(null);
        setSuccess("Personal information is updated successfully")
      }
    })
    .catch((err)=>{
      console.log(err);
      if(err.response?.data.errors.msg == "E-mail already in use"){
        setError(`${err.response?.data.errors.msg}, if you want to update username/phone, you must update email also`)
      }
      // setError(err.response?.data.message)
      setSuccess(null);
      setLoading(false);
    })
  }

  let phoneReg = /^01[0125][0-9]{8}$/;
  let passwordReg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{6,}$/;

  let validationSchema = Yup.object({
      name: Yup.string().min(3 , "Min length of username is 3 character").max(20 , "Max length of username is 15 character").required("username is required *"),
      email: Yup.string().email("Email is not valid").required("Email is required *"),
      phone:  Yup.string().matches(phoneReg , "Phone is not valid, accept Egyptian numbers only").required("Phone is required *"),
  })
  

  let formik = useFormik({
    initialValues: {
      name: userData.username,
      email: userData.userEmail,
      phone: userData.userPhone,
    },
    validationSchema,
    onSubmit: submitFun
  })

  let formikPasswordValidation = Yup.object({
    currentPassword: Yup.string().matches(passwordReg , "password must have at least one uppercase, lowercase , digit and minimum length is 6").required("Current password is required *"),
    password: Yup.string().matches(passwordReg , "password must have at least one uppercase, lowercase , digit and minimum length is 6").required("New password is required *"),
    rePassword: Yup.string().oneOf([Yup.ref("password")],"Repassword does'nt match password").required("Repassword is required *"),
  })

  function submitPasswordFun(values){
    console.log(values);
    setLoadingPass(true);
    axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values , {
      headers:{
        token
      }
    })
    .then(({data})=>{
      console.log(data);
      if(data.message == "success"){
        window.localStorage.setItem("userToken" , data.token);
        setLoadingPass(false);
        setErrorPass(null);
        setSuccessPass("Password is updated successfully");
        setTimeout(()=>{
          navigate("/login");
        },1000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setErrorPass(null);
      setSuccessPass(null);
      setLoadingPass(false);
    })
  }

  let formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: formikPasswordValidation,
    onSubmit: submitPasswordFun
  })

  function getAllAddress(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{
      headers:{
        token
      }
    })
    .then(({data})=>{
      setAllAddress(data.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getAllAddress()
  },[])

  function onSubmitAdressFun(values){
    setLoadingAddress(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, values , {
      headers:{
        token
      }
    })
    .then(({data})=>{
      console.log(data);
      if(data.status == "success"){
        setAllAddress(data.data)
        setLoadingAddress(false);
        setAddressFail(null);
        setAddressSuccess("Address is added successfully");
        setTimeout(()=>{
          setAddressSuccess(null);
        },2000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setAddressFail(err.response?.data.message)
      setTimeout(()=>{
        setAddressFail(null);
      },2000)
      setAddressSuccess(null);
      setLoadingAddress(false);
    })
  }

  function deleteAddress(id){
    setLoading(id);
    axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
      headers:{
        token
      }
    })
    .then(({data})=>{
      setAllAddress(data.data);
      setLoading(null);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  //  formik address validation
  let formikAddressValidation = Yup.object({
    name: Yup.string().required("Address name is required *"),
    details: Yup.string().required("Address details is required *"),
    phone:  Yup.string().matches(phoneReg , "Phone is not valid, accept Egyptian numbers only").required("Phone is required *"),
    city: Yup.string().required("City is required *")
  })

  // Formik address

  let formikAddress = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: formikAddressValidation,
    onSubmit: onSubmitAdressFun
  })
  

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="my-5 container">
        
        <div className='row'>
          <div className='col-md-8 mt-5' style={{margin: "auto"}}>
            <form onSubmit={formik.handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='w-100 p-4 m-auto rounded-2'>
            <div className='mb-4 text-center'>
              <h2 className='h4'>Personal Information</h2>
            </div>
            {(error)?
              <div className='alert alert-danger'>{error}</div>:""}
              {(success)?
              <div className='alert alert-success'>{success}</div>:""}
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="username">Username:</label>
                  <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" style={{width: "90%" , color: "#acaaa6"}} className='form-control rounded-0' name='name' id='username'/>
                </div>
            
                {(formik.errors.name&&formik.touched.name)
                ?<div style={{width: "90%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formik.errors.name}</div>
                :""}
                
              </div>
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="email">Email:</label>
                  <input style={{width: "90%" , color: "#acaaa6"}}  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control rounded-0' name='email' id='email'/>
                </div>
                {(formik.errors.email &&formik.touched.email)
                ?<div style={{width: "90%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formik.errors.email}</div>
                :""}
              </div>
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="phone">Phone:</label>
                  <input style={{width: "90%" , color: "#acaaa6"}}  value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control rounded-0' name='phone' id='phone'/>
                </div>
                {(formik.errors.phone&&formik.touched.phone)
                ?<div style={{width: "90%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formik.errors.phone}</div>
                :""}
              </div>
              
                  
              <button style={{background:"#845EF2"}} disabled={(formik.isValid && formik.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
                {loading
                ? <Loading color="#fff"/>
                :"Update"}
              </button>
            
            </form>
            
            <form onSubmit={formikPassword.handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='w-100 mt-5 p-4 m-auto rounded-2'>
              <h2 className='mb-4 h4 text-center'>Change my password</h2>
              {(errorPass)?
              <div className='alert alert-danger'>{errorPass}</div>:""}
              {(successPass)?
              <div className='alert alert-success'>{successPass}</div>:""}
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="cPassword">Current Password:</label>
                  <input style={{width: "85%" , color: "#acaaa6"}}  value={formikPassword.values.currentPassword} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} type="password" className='form-control rounded-0' name='currentPassword' id='cPassword'/>
                </div>
                {(formikPassword.errors.currentPassword && formikPassword.touched.currentPassword)
                ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikPassword.errors.currentPassword}</div>
                :""}
              </div>
            
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="password">New Password:</label>
                  <input style={{width: "85%" , color: "#acaaa6"}}  value={formikPassword.values.password} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} type="password" className='form-control rounded-0' name='password' id='password'/>
                </div>
                {(formikPassword.errors.password && formikPassword.touched.password)
                ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikPassword.errors.password}</div>
                :""}
              </div>
            
            
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="rePassword">Repassword:</label>
                  <input style={{width: "85%" , color: "#acaaa6"}}  value={formikPassword.values.rePassword} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} type="password" className='form-control rounded-0' name='rePassword' id='rePassword'/>
                </div>
                {(formikPassword.errors.rePassword && formikPassword.touched.rePassword)
                ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikPassword.errors.rePassword}</div>
                :""}
              </div>
              <button style={{background:"#845EF2"}} disabled={(formikPassword.isValid && formikPassword.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
                {loadingPass
                ? <Loading color="#fff"/>
                :"Update"}
              </button>
            </form>
            
            <form onSubmit={formikAddress.handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='w-100 mt-5 p-4 m-auto rounded-2'>
              <h2 className='mb-4 h4 text-center'>Add new Address</h2>
            
              {(addressFail)?
              <div className='alert alert-danger'>{addressFail}</div>:""}
              {(addressSuccess)?
              <div className='alert alert-success'>{addressSuccess}</div>:""}
            
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label htmlFor="addreesName">Address name:</label>
                  <input style={{width: "85%" , color: "#acaaa6"}}  value={formikAddress.values.name} onChange={formikAddress.handleChange} onBlur={formikAddress.handleBlur} type="text" className='form-control rounded-0' name='name' id='addreesName'/>
                </div>
                {(formikAddress.errors.name && formikAddress.touched.name)
                ?<div style={{width: "85%", marginLeft: "auto"}} className='alert alert-danger p-2 mt-1'>{formikAddress.errors.name}</div>
                :""}
              </div>
            
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
                :"Add"}
              </button>
            </form>
          </div>
          
          <div className='col-md-4 mt-5'>
            {allAddress? allAddress.map((item,index)=>
              <div key={index} className='px-3 pt-2 pb-3 mb-3 rounded-2' style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                <div className='text-end'>
                  <section style={{cursor: "pointer"}} onClick={()=>deleteAddress(item._id)} className='d-inline-block bg-danger text-white py-0 px-2 mt-2 rounded-2'>
                    {loading == item._id?
                      <Loading color="#FFF"/>
                    :<i style={{fontSize: "12px"}} className="fa-solid fa-trash-can p-0"></i>}
                  </section>
                </div>
                <h6 className='text-center'>Address {index + 1}</h6>
                <section>Name: {item.name}</section>
                <section>Details: {item.details}</section>
                <section>phone: {item.phone}</section>
                <section>city: {item.city}</section>
              </div>
            ):""}
          </div>
        </div>
      
      </div>
    </>
  )
}

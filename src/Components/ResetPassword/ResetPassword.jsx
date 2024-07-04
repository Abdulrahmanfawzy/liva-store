import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Login() {
  let navigate = useNavigate();
  let [error , setError] = useState(null);
  let [loading , setLoading] = useState(null);
  function submitFun(values){
    setLoading(true);
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then(({data})=>{
      window.localStorage.setItem("userToken",data.token);
      navigate("/login");
    })
    .catch((err)=>{
      setError(err.response?.data.message)
      setLoading(false);
    })
  }

  let passwordReg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{6,}$/;

  let validationSchema = Yup.object({
      email: Yup.string().email("Email is not valid").required("Email is required *"),
      newPassword:  Yup.string().matches(passwordReg , "password must have at least one uppercase, lowercase , digit and minimum length is 6").required("Password is required *"),
  })
  

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitFun
  })
  

  return (
    <div className="row align-items-center m-0">
      <div className="col-md-6">
        <div className='mt-5 mb-3 text-center'>
          <h2>New Password</h2>
        </div>
        
        
        <form onSubmit={formik.handleSubmit} className='w-75 mb-5 m-auto'>
          {(error)?
          <div className='alert alert-danger'>{error}</div>:""}
          <div className='mb-2'>
            <label className='mb-1' htmlFor="email">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' name='email' id='email'/>
            {(formik.errors.email &&formik.touched.email)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.email}</div>
            :""}
          </div>
          <div className='mb-2'>
            <label className='mb-1' htmlFor="newPassword">New Password:</label>
            <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='newPassword' id='newPassword'/>
            {(formik.errors.newPassword&&formik.touched.newPassword)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.newPassword}</div>
            :""}
          </div>
          
          <button style={{background:"#845EF2"}} disabled={(formik.isValid && formik.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
            {loading
            ? <Loading color="#fff"/>
            :"Submit"}
          </button>
          
        </form>

      </div>
      <div className="col-md-6 d-none d-md-block p-0">
        <img className='w-100 object-fit-cover vh-100 d-block' src={require("../../assets/imgs/signup.jpg")} alt="e-commerce image" />
      </div>
    </div>
  )
}

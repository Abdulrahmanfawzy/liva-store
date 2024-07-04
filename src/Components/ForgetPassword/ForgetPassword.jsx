import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Login() {
  let navigate = useNavigate();
  let [error , setError] = useState(null);
  let [success , setSuccess] = useState(null);
  let [loading , setLoading] = useState(null);
  function submitFun(values){
    console.log(values);
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    .then(({data})=>{
      console.log(data);
      if(data.statusMsg == "success"){
        setLoading(false);
        setSuccess(data.message);
        setError(null)
        navigate("/verifycode");
      }
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response?.data.message)
      setSuccess(null);
      setLoading(false);
    })
  }


  let validationSchema = Yup.object({
      email: Yup.string().email("Email is not valid").required("Email is required *"),
  })
  

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitFun
  })
  


  return (
    <div className="row align-items-center m-0">
      <div className="col-md-6">
        <div className='mt-5 mb-3 text-center'>
          <h2>Forget Password</h2>
        </div>
        
        
        <form onSubmit={formik.handleSubmit} className='w-75 mb-5 m-auto'>
          {(error)?
          <div className='alert alert-danger'>{error}</div>:""}
          {(success)?
          <div className='alert alert-success'>{success}</div>:""}
          <div className='mb-2'>
            <label className='mb-1' htmlFor="email">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' name='email' id='email'/>
            {(formik.errors.email &&formik.touched.email)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.email}</div>
            :""}
          </div>
          
          <button style={{background:"#845EF2"}} disabled={(formik.isValid && formik.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
            {loading
            ? <Loading color="#fff"/>
            :"Send"}
          </button>
          
        </form>

      </div>
      <div className="col-md-6 d-none d-md-block p-0">
        <img className='w-100 object-fit-cover vh-100 d-block' src={require("../../assets/imgs/signup.jpg")} alt="e-commerce image" />
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function VerifyCode() {
  let navigate = useNavigate();
  let [error , setError] = useState(null);
  let [loading , setLoading] = useState(null);
  function submitFun(values){
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then(({data})=>{
      console.log(data);
      if(data.status == "Success"){
        setLoading(false);
        navigate("/changepass");
      }
    })
    .catch((err)=>{
      setError(err.response?.data.message)
      setLoading(false);
    })
  }


  let validationSchema = Yup.object({
    resetCode: Yup.number("ResetCode must be a number type").required("ResetCode is required *"),
  })
  

  let formik = useFormik({
    initialValues: {
      resetCode: ""
    },
    validationSchema,
    onSubmit: submitFun
  })
  

  return (
    <div className="row align-items-center m-0">
      <div className="col-md-6">
        <div className='mt-5 mb-3 text-center'>
          <h2>Verification Code</h2>
        </div>
        
        
        <form onSubmit={formik.handleSubmit} className='w-75 mb-5 m-auto'>
          {(error)?
          <div className='alert alert-danger'>{error}</div>:""}

          <div className='mb-2'>
            <label className='mb-1' htmlFor="resetCode">ResetCode:</label>
            <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="string" className='form-control' name='resetCode' id='resetCode'/>
            {(formik.errors.resetCode &&formik.touched.resetCode)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.resetCode}</div>
            :""}
          </div>
          
          <button style={{background:"#845EF2"}} disabled={(formik.isValid && formik.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
            {loading
            ? <Loading color="#fff"/>
            :"Verify"}
          </button>
          
        </form>

      </div>
      <div className="col-md-6 d-none d-md-block p-0">
        <img className='w-100 object-fit-cover vh-100 d-block' src={require("../../assets/imgs/signup.jpg")} alt="e-commerce image" />
      </div>
    </div>
  )
}

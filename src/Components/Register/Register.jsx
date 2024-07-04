import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { userContext } from '../../Context/UserContext';

export default function Register() {
  let navigate = useNavigate();
  let {setUserData} = useContext(userContext)
  let [error , setError] = useState(null);
  let [loading , setLoading] = useState(null);

  function submitFun(values){
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then(({data})=>{
      
      if(data.message == "success"){
        window.localStorage.setItem("userToken",data.token);
        window.localStorage.setItem("userData",JSON.stringify({username: values.name , userEmail: values.email , userPhone: values.phone}));
        setLoading(false);
        navigate("/");
      }
    })
    .catch((err)=>{
      setError(err.response?.data.message)
      setLoading(false);
    })
  }

  let phoneReg = /^01[0125][0-9]{8}$/;
  let passwordReg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{6,}$/;

  let validationSchema = Yup.object({
      name: Yup.string().min(3 , "Min length of username is 3 character").max(20 , "Max length of username is 15 character").required("username is required *"),
      email: Yup.string().email("Email is not valid").required("Email is required *"),
      phone:  Yup.string().matches(phoneReg , "Phone is not valid, accept Egyptian numbers only").required("Phone is required *"),
      password:  Yup.string().matches(passwordReg , "password must have at least one uppercase, lowercase , digit and minimum length is 6").required("Password is required *"),
      rePassword:  Yup.string().oneOf([Yup.ref("password")],"Repassword does'nt match password").required("Repassword is required *"),
  })
  

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitFun
  })
  

  return (
    <div className="row align-items-center m-0">
      <div className="col-md-6">
        <div className='mt-5 mb-3 text-center'>
          <h2>Create an account</h2>
          <section>Sign up now to get more advantages.</section>
        </div>
        
        
        <form onSubmit={formik.handleSubmit} className='w-75 mb-5 m-auto'>
          {(error)?
          <div className='alert alert-danger'>{error}</div>:""}
          <div className='mb-2'>
            <label className='mb-1' htmlFor="username">Username:</label>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' name='name' id='username'/>
            {(formik.errors.name&&formik.touched.name)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.name}</div>
            :""}
            
          </div>
          <div className='mb-2'>
            <label className='mb-1' htmlFor="email">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' name='email' id='email'/>
            {(formik.errors.email &&formik.touched.email)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.email}</div>
            :""}
          </div>
          <div className='mb-2'>
            <label className='mb-1' htmlFor="phone">Phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' name='phone' id='phone'/>
            {(formik.errors.phone&&formik.touched.phone)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.phone}</div>
            :""}
          </div>
          <div className='mb-2'>
            <label className='mb-1' htmlFor="email">password:</label>
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='password' id='password'/>
            {(formik.errors.password&&formik.touched.password)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.password}</div>
            :""}
          </div>
          <div>
            <label className='mb-1' htmlFor="email">Repassword:</label>
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='rePassword' id='repassword'/>
            {(formik.errors.rePassword && formik.touched.rePassword)
            ?<div className='alert alert-danger p-2 mt-1'>{formik.errors.rePassword}</div>
            :""}
          </div>
              
          <button style={{background:"#845EF2"}} disabled={(formik.isValid && formik.dirty) ?false : true} type='submit' className='btn text-white w-100 mt-3'>
            {loading
            ? <Loading color="#fff"/>
            :"Create Account"}
          </button>
          <span className='mt-2 d-block'>
          Already have an account? 
          <Link to="/login"  className='ms-2 text-dark mt-2 w-100 '>
            Sign in
          </Link>
          </span>

        </form>

      </div>
      <div className="col-md-6 d-none d-md-block p-0">
        <img className='w-100 object-fit-cover vh-100 d-block' src={require("../../assets/imgs/signup.jpg")} alt="e-commerce image" />
      </div>
    </div>
  )
}

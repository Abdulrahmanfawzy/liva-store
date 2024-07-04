import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Style from "./Navbar.module.css";
import { cartContext } from '../../Context/CartContext';
import logoImg from "../../assets/imgs/logo.svg";
export default function Navbar() {
  let pathName = window.location.pathname;
  let userToken = window.localStorage.userToken;
  let navigate = useNavigate();
  let {numberOfCart , numberOfWishlist} = useContext(cartContext);
  let [activeClass,setAtiveClass] = useState(1);
  let [navActive,setNavActive] = useState(false);
  function logoutFun(){
    window.localStorage.removeItem("userToken");
    navigate("/login");
  }
  function handleActiveLink(id){
    setAtiveClass(id)
  }

  function navScroll(){
    window.onscroll = ()=>{
      if(document.documentElement.scrollTop > 50){
        setNavActive(true)
      }else{
        setNavActive(false);
      }
    }
  }
  navScroll()

  return <>
      {pathName != "/login"?

      <nav className={`navbar ${navActive?`${Style.navActive}`:""} navbar-expand-lg position-fixed top-0 z-3 w-100`}>
      <div className="container ">
        <Link onClick={()=>handleActiveLink(1)} className="navbar-brand" to="/">
          <img src={logoImg} alt="" />
        </Link>
        <button onClick={()=>setNavActive(true)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse align-items-center navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav text-center ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link onClick={()=>handleActiveLink(1)} className={`nav-link ${activeClass == 1 ? `${Style.activeLink}` : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link onClick={()=>handleActiveLink(2)} className={`nav-link ${activeClass == 2 ? `${Style.activeLink}` : ""}`} to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link onClick={()=>handleActiveLink(3)} className={`nav-link ${activeClass == 3 ? `${Style.activeLink}` : ""}`} to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link onClick={()=>handleActiveLink(4)} className={`nav-link fw-6 ${activeClass == 4 ? `${Style.activeLink}` : ""}`} to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link onClick={()=>handleActiveLink(5)} className={`nav-link ${activeClass == 5 ? `${Style.activeLink}` : ""}`} to="/about">About US</Link>
            </li>
          </ul>
          <ul className="navbar-nav  d-flex flex-row justify-content-center ms-auto mb-2 mb-lg-0">
            {userToken?
            <Link to="/profile" className='me-3 text-decoration-none text-dark fs-5'>
              <i className="fa-solid fa-user"></i>
            </Link>
            :""
            }

            <Link to="/wishlist" className='position-relative text-dark mt-2 me-2'>
              <i className="fa-regular fa-heart fs-4"></i>
              <div className={Style.cartBag}>{numberOfWishlist?numberOfWishlist:0}</div>
            </Link>
            <Link to="/cart" className='position-relative text-dark mt-2 me-2'>
              <i className="fa-solid fa-bag-shopping fs-4"></i>
              <div className={Style.cartBag}>{numberOfCart?numberOfCart:0}</div>
            </Link>
            </ul>

            {userToken
            ? ""
            : 
            <li className="nav-item mb-3 mb-lg-0 text-center">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
            }
            
            {userToken ?
              <li className="nav-item mb-3 mb-lg-0 text-center">
                <span onClick={logoutFun} style={{cursor: "pointer"}} className="nav-link">Logout</span>
              </li>
            :""}
            
        </div>
      </div>
    </nav>
     :""}
    </>
  
}

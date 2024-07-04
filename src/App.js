import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import SpecificBrands from "./Components/SpecificBrands/SpecificBrands";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Categories from "./Components/Categories/Categories";
import Profile from "./Components/Profile/Profile";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import Orders from "./Components/Orders/Orders";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ChangePassword from "./Components/ResetPassword/ResetPassword";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductContextProvider from "./Context/ProductsContext";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import SpecificCategory from "./Components/SpecificCategory/SpecificCategory";
import Wishlist from "./Components/Wishlist/Wishlist";
import Contact from "./Components/Contact/Contact";
import UserContextProvider from "./Context/UserContext";


export default function App() {
  let queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ProductContextProvider>
            <BrowserRouter basename="liva-store">
              <CartContextProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="productdetails/:productid" element={<ProductDetails />} />
                <Route path="products" element={<Products />} />
                <Route path="brands" element={<Brands />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/:categoryid" element={<SpecificCategory />} />
                <Route path="brands/:brandid" element={<SpecificBrands />} />
                <Route path="about" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="shipping/:cartid" element={<ShippingAddress />} />
                <Route path="orders/:userid" element={<Orders />} />
                <Route path="orders/:userid/allorders" element={<Orders />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="forgetpass" element={<ForgetPassword />} />
                <Route path="verifycode" element={<VerifyCode />} />
                <Route path="changepass" element={<ChangePassword />} />
                <Route path="*" element={<div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                  <h1 style={{fontSize: "3rem"}}>Not found</h1>
                </div>} />
              </Routes>
        </CartContextProvider>
            </BrowserRouter>
          </ProductContextProvider>
        </UserContextProvider>
        <Toaster />
    </QueryClientProvider>
  );
}

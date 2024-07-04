import React from 'react';
import aboutImg from "../../assets/imgs/about.jpeg"
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>About us</title>
      </Helmet>
      <div style={{marginTop: "100px"}} className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>Our Story</h2>
            <section>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </section>
            <section>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure.
            </section>
            <section>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College.
            </section>
          </div>
          <div className="col-md-6">
            <img className='w-100 rounded-2' src={aboutImg} alt="" />
          </div>
        </div>
      
        <h2 className='mt-5 text-center'>Why Choose Us</h2>
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-2">
            <div className='border p-3'>
              <h2>
                <i className="fa-solid fa-truck-fast"></i>
              </h2>
              <h3>Free Shipping</h3>
              <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.
              </section>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className='border p-3'>
              <h2>
              <i className="fa-solid fa-money-bill-wave"></i>
              </h2>
              <h3>100% Back Gaurantee</h3>
              <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.
              </section>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className='border p-3'>
              <h2>
                <i className="fa-solid fa-headphones"></i>
              </h2>
              <h3>Online Support 24/7</h3>
              <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.
              </section>
            </div>
          </div>
        </div>
      
      </div>

      <Footer/>

    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-center text-lg-start text-white"
          style={{backgroundColor: "#1c2331"}}>
        <section className="d-flex justify-content-between p-4"
                style={{backgroundColor: "#6351ce"}}
                >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">ZEKO Company</h6>
                <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                    />
                <p>
                  ZEKO offers an alternative to traditional storefronts, but there are advantages and disadvantages to a business using e-commerce. You might be tempted to create a website and start selling your products online.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                    />
                <p>
                  <Link to="/products" className="text-white">Products</Link>
                </p>
                <p>
                  <Link to="/categories" className="text-white">Categories</Link>
                </p>
                <p>
                  <Link to="/brand" className="text-white">Brand</Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                    />
                <p>
                  <Link to="/profile" className="text-white">Your Account</Link>
                </p>
                <p>
                  <Link to="/wishlist" className="text-white">Wishlist</Link>
                </p>
                <p>
                  <Link to="/cart" className="text-white">Cart</Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                    />
                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>

        <div
            className="text-center p-3"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
            >
           Copyright © 2024 With Abdulrahman Fawzy
        </div>
      </footer>
  )
}

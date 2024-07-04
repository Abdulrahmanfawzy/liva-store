import React, { Component } from "react";
import Slider from "react-slick";

function CustomPaging({baseImg,imgChanges,title}) {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container text-center m-auto">
      <img className="w-75 object-fit-contain" src={baseImg} alt={title.split(" ").slice(0,3).join(" ")} />
      <Slider {...settings}>
      {imgChanges.map((image,index)=>
        <div key={index} className='m-2 w-75 text-center'>
            <img className='w-100 object-fit-contain' src={image} alt={title.split(" ").slice(0,3).join(" ")}/>
        </div>
        )}
      </Slider>
    </div>
  );
}

export default CustomPaging;

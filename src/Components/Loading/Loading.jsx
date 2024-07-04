import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function Loading({color}) {
  return (
    <RotatingLines
      visible={true}
      height="18"
      width="18"
      strokeColor= {color}
      color={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
  />
  )
}

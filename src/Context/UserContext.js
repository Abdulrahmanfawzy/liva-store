import axios from "axios";
import React, { createContext, useState } from "react";


export let userContext = createContext();

export default function UserContextProvider({children}){
    let [userData , setUserData] = useState(null)
    let token = window.localStorage.getItem("userToken");

    // function getUserData(){
    //     return axios.get(`https://ecommerce.routemisr.com/api/`)
    // }

    function getOrders(userid){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)
        .then(res=>res)
        .catch(err=>err);
    }

    // function checkoutPayment(cartid){
    //     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000` , {} , {
    //         headers: {
    //             token
    //         }
    //     })
    //     .then(res=>res)
    //     .catch(err=>err);
    // }


    return <userContext.Provider value={{userData ,getOrders,setUserData}}>
        {children}
    </userContext.Provider>
}
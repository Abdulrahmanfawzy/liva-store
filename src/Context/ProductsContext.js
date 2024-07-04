import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

export let productContext = createContext();

export default function ProductContextProvider({children}){

    function getAllProducts(val){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${val}`)
        .then(res=>res)
        .catch(err=>err)
    }

    function getAllProductsForHome(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?price[gte]=14000`)
        .then(res=>res)
        .catch(err=>err)
    }

    function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(res=>res)
        .catch(err=>err)
    }

    function getSpecificCategory(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then(res=>res)
        .catch(err=>err)
    }

    function getAllBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then(res=>res)
        .catch(err=>err)
    }

    function categoriesFilter(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        .then(res=>res)
        .catch(err=>err)
    }

    function brandsFilter(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
        .then(res=>res)
        .catch(err=>err)
    }


    
      
      
    return <productContext.Provider value={{getAllProducts, getAllProductsForHome , brandsFilter , getSpecificCategory , getAllBrands , categoriesFilter ,getAllCategories}}>
        {children}
    </productContext.Provider>
}
import axios from 'axios'
export const startGetProducts=()=>{
    //becouse i have a redux thunk now i can return a function
    return async (dispatch)=>{
        try{
          const response=await axios.get('http://localhost:3046/api/products')
          console.log(response.data)
          dispatch(setProduct(response.data))
         
        }catch(err){
     console.log(err)
        }
    }
}
const setProduct=(data)=>{
    return {
        type:"SET_PRODUCTS",payload:data
    }
}
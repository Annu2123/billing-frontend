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
export const startCreateProduct=(form,reset)=>{
 return async (dispatch)=>{
    try{
     const response=await axios.post('http://localhost:3046/api/products',form)
     console.log(response.data)
     dispatch(setFormdata(response.data ))
     reset()
    }catch(err){
        console.log(err)
        dispatch(setServerError(err.response.data.errors))
    }
 }
}
export const startUpdateProduct=(id,formdata,reset,toggle)=>{
    return async(dispatch)=>{
         try{
          const resposne=await axios.put(`http://localhost:3046/api/products/${id}`,formdata)
          console.log(resposne.data)
          dispatch(updateProduct(resposne.data))
          reset()
          toggle()
         }catch(err){
            console.log(err)
            dispatch(setServerError(err.resposne.data.errors))
         }
    }
}
export const startRemoveProduct=(id)=>{
    return async(dispatch)=>{
        try{
          const response=await axios.delete(`http://localhost:3046/api/products/${id}`)
          console.log(response.data)
          dispatch(removeProduct(response.data))
        }catch(err){
             console.log(err)
        }
    }
}
const updateProduct=(data)=>{
    return {
        type:"UPDATE_PRODUCT",payload:data
    }
}
const removeProduct=(data)=>{
    return {
        type:"REMOVE_PRODUCT",payload:data
    }
}
const setProduct=(data)=>{
    return {
        type:"SET_PRODUCTS",payload:data
    }
}
const setFormdata=(data)=>{
    return{
        type:"ADD_PRODUCT",payload:data
    }
}
 export const setServerError=(error)=>{
    return {
        type:"SET_ERROR",payload:error
    }
}
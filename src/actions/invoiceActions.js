import axios from 'axios'
export const startGetInvoice=()=>{
    return async (dispatch)=>{
        try{
          const response=await axios.get('http://localhost:3046/api/invoice')
          console.log("shd",response.data)
          dispatch(setInvoice(response.data))
         
        }catch(err){
           console.log(err)
        }
    }
} 

const setInvoice=(data)=>{
    return {
        type:"SET_INVOICE",payload:data
    }
}
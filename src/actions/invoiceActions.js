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

export const startCreateInvoice = (formData, redirect) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3050/api/invoices', formData)
            dispatch(addInvoice(response.data))
            redirect()
        } catch(err) {
            alert(err)
        }
    }
}

const setInvoice=(data)=>{
    return {
        type:"SET_INVOICE",payload:data
    }
}
const addInvoice = (invoice) => {
    return { 
        type: 'ADD_INVOICE',
        payload: invoice
    }
}
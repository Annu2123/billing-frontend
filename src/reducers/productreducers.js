const initialState={
    data:[]
}
const productReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_PRODUCTS":{
            return {...state,data:action.payload}
        }
        default :{
            return {...state}
        }
    }
}
export default productReducers
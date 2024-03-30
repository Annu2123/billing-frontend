const initialState={
    data:[],
    serverError:[]
}
const productReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_PRODUCTS":{
            return {...state,data:action.payload}
        }
        case "ADD_PRODUCT" :{
            return {...state,data:[...state.data,action.payload]}
        }
        case "SET_ERROR":{
              return {...state,serverError:action.payload}
        }
        case "REMOVE_PRODUCT":{
            return {...state,data:state.data.filter((ele)=>{
                       if(ele._id != action.payload._id){
                        return ele
                       }
            })}
        }
        case "UPDATE_PRODUCT":{
            return {...state,data:state.data.map((ele)=>{
                if(ele._id == action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            })}
        }
        default :{
            return {...state}
        }
    }
}
export default productReducers
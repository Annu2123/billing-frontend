const initialState={
    data:[],
    serverError:[]
}
  const invoicetReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_INVOICE":{
            return {...state,data:action.payload}
        }
        default :{
            return state
        }

    }
}
export default invoicetReducers
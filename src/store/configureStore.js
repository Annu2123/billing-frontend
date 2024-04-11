import {createStore,combineReducers,applyMiddleware} from  'redux'
import {thunk} from 'redux-thunk'
import productReducers from '../reducers/productreducers'
import invoiceReducers from '../reducers/invoiceReducers'
const configureStore=()=>{
    const store=createStore(combineReducers({
        products:productReducers,
        invoice:invoiceReducers
    }),applyMiddleware(thunk))
    return store
}
export default configureStore
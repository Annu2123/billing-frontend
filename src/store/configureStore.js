import {createStore,combineReducers,applyMiddleware} from  'redux'
import {thunk} from 'redux-thunk'
import productReducers from '../reducers/productreducers'
const configureStore=()=>{
    const store=createStore(combineReducers({
        products:productReducers
    }),applyMiddleware(thunk))
    return store
}
export default configureStore
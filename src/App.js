import { useEffect ,useContext,useReducer} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { startGetProducts } from "./actions/productActions";
import {Routes,Route,Link} from 'react-router-dom'
import Dashboard from "./components/dashboard";
import ProductsContainer from "./components/productsContainer";
import CustomerContainer from "./components/customerContsiner";
import {CustomerContext} from './context/root-context'
import { startGetInvoice } from "./actions/invoiceActions";
import  customerReducer from './reducers/customerReducer'
import axios from 'axios'
import CustomerShow from "./components/customerShow";
import InvoiceContainer from "./components/invoiceContainer";
function App() {
  const [customer,customerDispatch]=useReducer(customerReducer,{data:[],serverError:[]})
  const dispatch=useDispatch()
  const products=useSelector((state)=>{
    return state.products
  })
  useEffect(()=>{
 dispatch(startGetProducts());
 dispatch(startGetInvoice());
 (async()=>{
  try{
    const response=await  axios.get('http://localhost:3046/api/customer')
    console.log(response.data)
    customerDispatch({type:"SET_CUSTOMER",payload:response.data})
  }catch(err){
    console.log(err)
  }
 })()
  },[dispatch])

  return (
    <div className="App">
      <CustomerContext.Provider value={{customer, customerDispatch}}>
      <Link to="/products">products</Link>|
      <Link to="/dashboard">dashboard</Link>|
      <Link to="/customer"> customer</Link>|
      <Link to="/invoiceContainer"> invoiceContainer</Link>
     
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/products" element={<ProductsContainer/>}/>
        <Route path="/customer" element={<CustomerContainer/>}/>
        <Route path="/customer/Show/:id" element={<CustomerShow/>}/>
        <Route path="/invoiceContainer" element={<InvoiceContainer/>}/>
      </Routes>
      
      </CustomerContext.Provider>
    </div>
  );
}

export default App;

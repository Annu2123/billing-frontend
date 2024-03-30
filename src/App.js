import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { startGetProducts } from "./actions/productActions";
import {Routes,Route,Link} from 'react-router-dom'
import Dashboard from "./components/dashboard";
import ProductsContainer from "./components/productsContainer";
function App() {
  const dispatch=useDispatch()
  const products=useSelector((state)=>{
    return state.products
  })
  useEffect(()=>{
 dispatch(startGetProducts())
  },[dispatch])
  return (
    <div className="App">
      <Link to="/products">products</Link>
      <Link to="/dashboard">dashboard</Link>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/products" element={<ProductsContainer/>}/>
      </Routes>
      
    
    </div>
  );
}

export default App;

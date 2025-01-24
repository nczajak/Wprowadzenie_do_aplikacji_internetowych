import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import './App.css';
import Product from "./pages/product";
import {useEffect, useState} from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import BucketPage from "./pages/bucketPage";
import Order from "./pages/order";


function App() {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/api/products')
            .then(res => res.json())
            .then(data=>{
                setProducts(data.products);
            });
    },[]);

    console.log(products)


  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home products={products}/>} />
          <Route path="product/:id/*" element={<Product products={products} />} />
          <Route path="login/*" element={<Login/>}/>
          <Route path="login/register" element={<Register/>}/>
          <Route path="bucket" element={<BucketPage/>}/>
          <Route path="order" element={<Order/>}/>
      </Routes>
    </Router>
  );
}

export default App;

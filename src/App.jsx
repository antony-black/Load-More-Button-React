import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Products from "./components/List/Products";
import MoreButton from "./components/MoreButton";
import "./index.scss";

export default function App() {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  const url = `https://dummyjson.com/products?limit=20&skip=${
    count === 0 ? 0 : count * 20
  }`;

  const fetchProducts = async (currentURL) => {
    setLoading(true);
    try {
     const response = await fetch(currentURL);
     const data= await response.json();

     if (data && data.products && data.products.length) {
      setProducts((prevData) => [...prevData, ...data.products]);
      setLoading(false);
    }
  } catch (e){
      console.log(e);
      setErrorMsg(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(url);
  },[count]);

  useEffect(() => {
    if (products?.length >= 100) setDisabledButton(true);
  }, [products]);


  if (isLoading) {
    return <div>...loading</div>;
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>
  }

  return (
    <div className="main-container">
      <Products products={products}/>
      <MoreButton 
      products={products} 
      disabledButton={disabledButton} 
      count={count} setCount={setCount}
      />
    </div>
  );
}

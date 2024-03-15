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










// export default function App() {
//   const [isLoading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [count, setCount] = useState(0);
//   const [disabledButton, setDisabledButton] = useState(false);

//   const url = `https://dummyjson.com/products?limit=20&skip=${
//     count === 0 ? 0 : count * 20
//   }`;

//   const fetchProducts = async (currentURL) => {
//     try {
//       setLoading(true);

//       const response = await fetch(currentURL);
//       const data = await response.json();
//       console.log(data.products);
//       if (data && data.products && data.products.length) {
//         setProducts(data.products);
//         setLoading(false);
//       }
//     } catch (e){
//       setErrorMsg(e.message);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (url !== "") fetchProducts(url);
//   },[url]);

//   useEffect(() => {
//     if (products.length === 100) setDisabledButton(true);
//   },[products])

//   if(isLoading) {
//     return <div>...loading</div>
//   }

//   if (errorMsg) {
//     return <div>{errorMsg}</div>
//   }

//   return (
//     <div className="main-container">
//     <div className="product-container">
//     {
//       products ? 
//       products.map(product => {
//        return <div key={product.id} className="product">
//         <img src={product.thumbnail} alt={product.title}/>
//         <p>{product.title}</p>
//        </div>
//       })
//       : null
//     }
//     </div>
//     <div className="button-container">
//       <button disabled={disabledButton} className="more-btn" onClick={() => setCount(count + 1)}>Load More Products</button>
//     </div>
//     {
//      disabledButton ? <p>You have riched 100 products</p> : null
//     }
//     </div>
//   );
// }

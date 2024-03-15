import Product from "./Product";

export default function Products({products}) {
  const productsToShow = () => {
    return products?.length ? products.map((item, index) => (
     <Product key={index}{...item}/>
    ))
    : null
  }

  return (
    <div className="product-container">
      {  productsToShow()}
    </div>
  )
}
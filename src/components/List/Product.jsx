export default function Product({...item}) {
  return (
    <div className="product">
    <img
      src= {item.thumbnail}
      alt= {item.thumbnail}
    />
    <h3>{item.title}</h3>
  </div>
  )
}
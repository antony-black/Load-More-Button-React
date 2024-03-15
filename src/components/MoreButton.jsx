export default function MoreButton({products, count, setCount, disabledButton}) {
  return (
    <div className="button-container">
    <button 
    disabled={disabledButton}
    className="more-btn" 
    onClick={() => setCount(count + 1)}
    >
      Show More
      </button>
    {
      disabledButton ? <p>{`You have riched ${products?.length} products`}</p> : null
    }
  </div>
  )
}
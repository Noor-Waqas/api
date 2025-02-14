import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import LoadingImg from "./img/spinner.gif"

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [added, setAdded] = useState(false);
 

  async function getData() {
    const url = "https://dummyjson.com/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return ( <div style={{ display: "flex", justifyContent: "center" }}>
           <img src={LoadingImg} width={200} height={200} alt="loading" />
      </div>
    )
      if (error) return <h2>Error: {error}</h2>;
  console.log("data",data)

  const handleClick = ()=>{
    if (added ) {
      toast.warning("Already added to cart!");
    } else {
      toast.success("Add to cart successfully!");
      setAdded(true);
    }
   }

  return (
    <div>
      <h1>All API Data</h1>
      <div style={{display:"flex",justifyContent:"center"}}>
        <div >
        {data.map((product) => (
          <div key={product.id} style={{gap:"5px",display:"flex",margin:"4px",borderRadius:"10px",backgroundColor:"#FCB034" }}>
            <div style={{gap:"5px"}}>
            <h1 style={{textAlign:"center"}}> Name : {product.title}</h1> 
            <div>
              <p style={{textAlign:"center"}}> <strong>Price :</strong> ${product.price} </p>
              <p style={{textAlign:"center"}}>Brand : {product.brand}</p>
              <p style={{textAlign:"center"}}>Discound : {product.discountPercentage}</p>
              <p style={{textAlign:"center"}}>Rating : {product.rating}</p>
              <p style={{textAlign:"center"}}>Return Policy : {product.returnPolicy}</p>
              <p style={{textAlign:"center"}}>shipping Information : {product.shippingInformation}</p>
              <p style={{textAlign:"center"}}>Branch Code : {product.sku}</p>
              <p style={{textAlign:"center"}}>Stock : {product.stock}</p>
              <p style={{textAlign:"center"}}>Description: {product.description}</p>
  

            </div>
            <br />
            <div style={{display:"flex",justifyContent:"center"}}>
            <img src={product.thumbnail} alt={product.title}/>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <button onClick={handleClick} style={{backgroundColor:"black",color:"white",width:"150px",height:"50px",borderRadius:"10px",cursor:"pointer",marginBottom:"10px"}}>Add To Cart</button>
            </div>
          </div>
          </div>
        ))}
      </div>
      </div>
      <ToastContainer style={{fontSize:"10px"}} />
    </div>
  );
}

export default App;

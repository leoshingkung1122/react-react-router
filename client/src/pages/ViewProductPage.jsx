import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewProductPage() {
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const results = await axios(`http://localhost:4001/products/${param.id}`);
        setProduct(results.data.data);
        setName(results.data.data.name);
        setPrice(results.data.data.price);
        setImage(results.data.data.image);
        setDescription(results.data.data.description);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getProduct();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px", "marginTop": "20px" ,
      "marginBottom": "20px"
      }}>Download Error</p>}
      {product && (
        <div className="view-product-container">
          <h2>{name}</h2>
          <img src={image} alt={name} />
          <p>Price: {price}</p>
          <p>{description}</p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;

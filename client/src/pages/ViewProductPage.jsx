import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewProductPage = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = ("");
  const navigate = useNavigate();
  const param = useParams();

  const getProductsData = async () => {
    try {
      const productData = await axios.get(`http://localhost:4001/products/${param.productId}`);
      setName(productData.data.data.name);
      setImg(productData.data.data.img);
      setPrice(productData.data.data.price);
      setDescription(productData.data.data.description);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <div className="product-preview">
          <img src={img} alt="some product" width="350" height="350" />
        </div>
        <h2>{name}</h2>
        <h3>Price: {price}</h3>
        <p>{description}</p>
      </div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ViewProductPage;

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ViewProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState();

  const endpoint = "http://localhost:4001";

  const navigate = useNavigate();

  const loadProduct = async () => {
    await axios
      .get(`${endpoint}/products/${productId}`)
      .then(function (response) {
        if (response) {
          setProduct(response.data.data);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    product && (
      <div>
        <h1>View Product Page</h1>
        <div className="view-product-container">
          <h2>{product.name}</h2>
          <p>{product.price} THB</p>
          <p>{product.description}</p>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    )
  );
}

export default ViewProductPage;

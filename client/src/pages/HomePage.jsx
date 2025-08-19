import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4001/products");
      setProducts(results.data.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      // Refresh the products list after deletion
      
      
    } catch (error) {
      console.error("Error deleting product:", error);
      setIsError("Failed to delete product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={() => navigate("/products/create")}>Create Product</button>
      </div>
      <div className="product-list">
      {isError ? <h1 style={{ color: "red", fontWeight: "bold" , fontSize: "30px" , marginBottom: "20px"}}>{isError}</h1> : null}
      {isLoading ? <h1 style={{ color: "red", fontWeight: "bold" , fontSize: "30px" , marginBottom: "20px"}}>Loading ....</h1> : null}
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt={product.name}
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description}</p>
                <div className="product-actions">
                  <button className="view-button" onClick={() => navigate(`/products/view/${product.id}`)}>View</button>
                  <button className="edit-button" onClick={() => navigate(`/products/edit/${product.id}`)}>Edit</button>
                </div>
              </div>

              <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

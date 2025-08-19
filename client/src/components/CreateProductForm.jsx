import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProductForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() !== 0) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    try {
      const results = await axios.post("http://localhost:4001/products", {
        name: name,
        image: image,
        price: parseInt(price),
        description: description
      });
      setIsError(false);

      console.log({
        name,
        image,
        price: parseInt(price),
        description
      });
      
      setName("");
      setImage("");
      setPrice("");
      setDescription("");
      setIsSuccess("Product created successfully");
      
      // Redirect to home page after 2 seconds
      /* setTimeout(() => { navigate("/");}, 2000);   */

    } catch (error) {
      console.error("Error creating product", error);
      setIsError("Failed to create product");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm() {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!image.trim()) {
      newErrors.image = "Image is required";
    }
    if (!price.trim()) {
      newErrors.price = "Price is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length;
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        {errors.name && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px"}}>{errors.name}</p>}
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        {errors.image && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px"}}>{errors.image}</p>}
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        {errors.price && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px"}}>{errors.price}</p>}
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={30}
            value={description}
          />
        </label>
        {errors.description && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px"}}>{errors.description}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red", fontWeight: "bold" , fontSize: "30px"}}>{isError}</p>}
      {isSuccess && <p style={{ color: "green", fontWeight: "bold" , fontSize: "30px"}}>{isSuccess}</p>}
    </form>
  );
}

export default CreateProductForm;

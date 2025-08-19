import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProductPage from "./pages/ViewProductPage";
import CreateProductPage from "./pages/CreateProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/view/:id" element={<ViewProductPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
      </Routes>
    </Router>
  )
}

export default App;

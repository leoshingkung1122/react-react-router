import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProductPage from "./pages/ViewProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/view/:id" element={<ViewProductPage />} />
      </Routes>
    </Router>
  )
}

export default App;

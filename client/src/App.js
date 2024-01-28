import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AddProductPage from "./Pages/AddProductPage";
import ProductListPage from "./Pages/ProductListPage";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-category" element={<AddCategoryPage />} />
          <Route path="/add-products" element={<AddProductPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ProductsPage from "./containers/Products/Products.js";
import AddEditProduct from "./component/Products/AddEditProduct/AddEditProduct";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Sale from "./component/Sale/Sale";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/sale" element={<Sale/>}/>
                  <Route path="/add-product" element={<AddEditProduct/>}/>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;

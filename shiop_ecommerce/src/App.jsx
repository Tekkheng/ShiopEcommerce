import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// home
import Home from "./pages/home/home";
import Product from "./pages/home/product";
import About from "./pages/home/about";
import Contact from "./pages/home/contact";
import DetailProduct from "./pages/home/detailProduct";
import Cart from "./pages/home/cart";

// admin
import Dashboard from "./pages/admin/dashboard";
import GetProduct from "./pages/admin/getProduct";
import AddProduct from "./pages/admin/addProduct";
import EditProduct from "./pages/admin/editProduct";

import GetContact from "./pages/admin/getContact";

import GetUsers from "./pages/admin/users";
import AddUsers from "./pages/admin/addUsers";
import EditUsers from "./pages/admin/editUsers";

import EditProfile from "./pages/editProfile";

import LoginUser from "./pages/home/login";
import RegisterUser from "./pages/home/register";

function App() {
  return (
    <>
    <Router>
      {/* admin */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/getProduct" element={<GetProduct/>}></Route>
        <Route path="/addProduct" element={<AddProduct/>}></Route>
        <Route path="/deleteProduct/:id" element={<GetProduct/>}></Route>
        <Route path="/editProduct/:id" element={<EditProduct/>}></Route>

        <Route path="/users" element={<GetUsers/>}></Route>
        <Route path="/addUsers" element={<AddUsers/>}></Route>
        <Route path="/editUsers/:id" element={<EditUsers/>}></Route>
        <Route path="/users/delete:id" element={<GetUsers/>}></Route>

        <Route path="/getContact" element={<GetContact/>}></Route>
        <Route path="/deleteContact/:id" element={<GetContact/>}></Route>

        <Route path="/profile/:uuid" element={<EditProfile/>}></Route>

      {/* home */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product" element={<Product/>}></Route>
        <Route path="/cart/:userId" element={<Cart/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/product/:id" element={<DetailProduct/>}></Route>
        <Route path="/login" element={<LoginUser/>}></Route>
        <Route path="/register" element={<RegisterUser/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

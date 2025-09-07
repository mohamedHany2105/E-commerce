import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home";
import About from "./page/About";
import Profile from "./page/Profile";
import Products from "./page/Products";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Search from "./page/Search";
import PrivateRoute from './components/PrivateRoute'
import CreateProduct from "./page/CreateProduct";
import UpdateProduct from './page/UpdateProduct'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Products />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Profile />} path="/profile" />
            <Route element={<CreateProduct />} path="/create" />
            <Route element={<UpdateProduct />} path="/update" />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

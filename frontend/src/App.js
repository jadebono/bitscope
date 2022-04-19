import React from "react";
// importing react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";

import RedTest from "./pages/RedTest"; // !! temporary

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/redtest" element={<RedTest />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

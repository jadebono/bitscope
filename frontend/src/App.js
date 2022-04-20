import React from "react";
import { useSelector } from "react-redux";
// importing react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Notify from "./components/Notify";

export default function App() {
  const notify = useSelector((state) => state.notification);
  return (
    <React.Fragment>
      {notify.active && <Notify />}
      <Navbar />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

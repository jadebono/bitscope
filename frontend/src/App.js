import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Subscribe from "../src/components/Subscribe";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />

      <Header />

      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}

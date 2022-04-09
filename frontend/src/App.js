import React from "react";
import Navbar from "./components/Navbar";
import Subscribe from "../src/components/Subscribe";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="">
        <h1 className="ml-4 mt-4 text-3xl text-blue-500 font-bold">
          Logonomikos
        </h1>
        <h4 className="ml-4 text-blue-900 font-bold">
          Rethinking the World in the Age of Tech
        </h4>
      </div>
      <Subscribe />
    </React.Fragment>
  );
}

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Subscribe from "../src/components/Subscribe";
import NotificationProvider from "./components/Notifications/NotificationProvider";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="">
        <div className="flex flex-row  justify-between">
          <h1 className="ml-4 mt-4 text-3xl text-blue-500 font-bold">
            Polykranos
          </h1>
          <div className="w-80 h-10 mt-4">
            <NotificationProvider />
          </div>
        </div>
        <h4 className="ml-4 text-blue-900 font-bold">
          Multidisciplinarity in an Overspecialised World
        </h4>
      </div>
      <Subscribe />
    </React.Fragment>
  );
}

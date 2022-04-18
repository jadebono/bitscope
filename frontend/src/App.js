import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Subscribe from "../src/components/Subscribe";
import { useNotification } from "./components/Notifications/NotificationProvider";

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [inputType, setInputType] = useState("");
  const dispatch = useNotification();

  function handleNewNotification() {
    dispatch({
      type: inputType,
      message: inputVal,
    });
  }
  // ? routing here or in index.js?
  return (
    <React.Fragment>
      <Navbar />

      <Header />

      <div className="flex flex-col mx-auto mt-20 border-2 border-red-600 w-1/2 ">
        <div className="flex flex-row">
          <input
            className="border-2 border-red-600 w-1/2 "
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <input
            className="border-2 border-red-600 w-1/2 "
            type="text"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
        </div>
        <div className="">
          <button
            className="w-1/4 bg-blue-300 rounded-lg cursor-pointer"
            onClick={handleNewNotification}
          >
            Add Notification
          </button>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

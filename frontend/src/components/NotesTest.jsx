import React, { useState } from "react";
import { useNotification } from "./Notifications/NotificationProvider";

export default function NotesTest() {
  const [inputVal, setInputVal] = useState("");
  const [inputType, setInputType] = useState("");
  const dispatch = useNotification();

  function handleNewNotification() {
    dispatch({
      type: inputType,
      message: inputVal,
    });
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

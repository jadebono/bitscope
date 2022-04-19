// !! temporary!
// * Form to deliver inputs to the notification system
/*
(1) Notification component
(2) State and reducer to deliver to the notification component
(3) Plug the reducer into the store
(4) call the store and the state in the component you want to call them from 
*/

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import Notify from "./Notify";

export default function NotesTestBackup() {
  const [inputVal, setInputVal] = useState("");
  const [inputType, setInputType] = useState("");
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notification);

  // type sets the colour of the notification
  // message is the message you want it to display
  function handleNewNotification() {
    dispatch(
      setNotification({
        type: inputType,
        message: inputVal,
      })
    );
  }

  return (
    <React.Fragment>
      {notify.active && <Notify />}
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

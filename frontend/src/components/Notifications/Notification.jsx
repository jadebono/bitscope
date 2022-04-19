import React, { useState, useEffect } from "react";

export default function Notification(props) {
  const [exit, setExit] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [width, setWidth] = useState(0);

  // setting the backGroundColour of the main div
  // this should be of a lighter colour than the bar
  // current settings: (1) success: green-100, (2) error: red-100
  // (3) warning: orange-100, (4) notify: blue-100
  const backGroundColour =
    props.type === "success"
      ? "bg-green-100"
      : props.type === "error"
      ? "bg-red-100"
      : props.type === "warning"
      ? "bg-orange-100"
      : props.type === "notify"
      ? "bg-blue-100"
      : "bg-white";

  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth < 100) {
          return prevWidth + 0.5;
        } else {
          clearInterval(id);
          return prevWidth;
        }
      });
    }, 20);
    setIntervalID(id);
  }

  function handlePauseTimer() {
    clearInterval(intervalID);
  }

  function handleCloseNotification() {
    handlePauseTimer();
    setExit((prevState) => true);
    setTimeout(() => {
      // remove from state and therefore the dom
      props.dispatch({ type: "REMOVE_NOTIFICATION", id: props.id });
    }, 400);
  }

  useEffect(() => {
    if (width === 100) {
      // if width === 100% close notification
      handleCloseNotification();
    }
  });

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <React.Fragment>
      <div
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleStartTimer}
        className={`notification-item ${backGroundColour} 
         ${exit ? "exit" : ""}`}
      >
        <p className="ml-2 text-indigo-900 font-bold">{props.message}</p>

        <div className={`${props.type}`} style={{ width: `${width}%` }} />
      </div>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";

export default function Notification(props) {
  const [exit, setExit] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [width, setWidth] = useState(0);

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
    }, 500);
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
  });

  // style bar may have to be created here as it contains logic

  // const [width, setWidth] = useState(0);

  return (
    <React.Fragment>
      <div
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleStartTimer}
        // className={`notification-item ${
        //   props.type === "SUCCESS" ? "success" : "error"
        // } ${exit ? "exit" : ""}`}
        className={`notification-item ${props.type} ${exit ? "exit" : ""}`}
      >
        <p className="ml-2">{props.message}</p>

        <div className="bar" style={{ width: `${width}%` }} />
      </div>
    </React.Fragment>
  );
}

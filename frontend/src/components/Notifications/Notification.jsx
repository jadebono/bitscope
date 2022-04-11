import React, { useState, useEffect } from "react";

export default function Notification(props) {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth < 100) {
          return prevWidth + 0.5;
        } else {
          return prevWidth;
        }
      });
    }, 20);
    setIntervalID(id);
  }

  function handlePauseTimer() {
    clearInterval(intervalID);
  }

  useEffect(() => {
    handleStartTimer();
  });

  // style bar may have to be created here as it contains logic

  // const [width, setWidth] = useState(0);

  return (
    <React.Fragment>
      <div
        className={`notification_item ${
          props.type === "SUCCESS" ? "success" : "error"
        }`}
      >
        <p className="ml-2">{props.message}</p>
      </div>
      <div className="bar" />
    </React.Fragment>
  );
}

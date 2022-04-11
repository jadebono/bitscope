import React from "react";
import { v4 } from "uuid";
import Notification from "./Notification";

export default function NotificationProvider(props) {
  // you can create as many types as you like with their own styles
  const notifications = [
    {
      id: v4(),
      type: "SUCCESS",
      message: "Hello World",
    },
  ];

  return (
    <React.Fragment>
      <div className={"notification_wrapper"}>
        {notifications.map((note) => {
          return <Notification key={note.id} {...note} />;
        })}
      </div>
      <div>{props.children}</div>
    </React.Fragment>
  );
}

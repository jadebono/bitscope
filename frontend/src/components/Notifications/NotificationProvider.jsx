import React, { createContext, useReducer, useContext } from "react";
import { v4 } from "uuid";
import Notification from "./Notification";

// creating the context to provide a value to everything nested
// within the NotificationProvider in index.js
const NotificationContext = createContext();

export default function NotificationProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD_NOTIFICATION":
          return [...state, { ...action.payload }];

        case "REMOVE_NOTIFICATION":
          return state.filter((el) => el.id !== action.id);
        default:
          return state;
      }
    },
    [
      // you can create as many types as you like with their own styles in this array
      {
        id: v4(),
        type: "error",
        message: "note to me",
      },
    ]
  );

  return (
    <React.Fragment>
      <NotificationContext.Provider value={dispatch}>
        <div className={"notification-wrapper"}>
          {state.map((note) => {
            return <Notification dispatch={dispatch} key={note.id} {...note} />;
          })}
        </div>
        <div>{props.children}</div>
      </NotificationContext.Provider>
    </React.Fragment>
  );
}

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

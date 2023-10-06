// App.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// for notifications of address updates
import { setNotification } from "../src/store/NotificationsSlice";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import Status from "./components/Status";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Notify from "./components/Notify";
import { userDetails, initiateWebhook, session } from "./modules/requests";
import { setUser } from "./store/UserSlice";
import io from "socket.io-client";

export default function App() {
  const [userSess, setUserSess] = useState({
    id: "",
    username: "",
    logged: false,
  });
  const notify = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Ref to track whether the webhook has been initialized during the current session
  const webhookInitialized = useRef(false);
  // Create a ref for the socket connection so it persists across renders
  const socketRef = useRef(null);
  // if there is a cookie in the browser retrieve user details and restore session
  useEffect(() => {
    async function getSession(cookieExists) {
      // if there is no userSess logged in, check to see if there is a cookie
      // if so, log in the user and and set the state.user to the same state as
      // userSess
      if (!userSess.logged && cookieExists === 0) {
        let loggedUser = await session();
        await setUserSess((prevUser) => {
          return {
            id: loggedUser.id,
            username: loggedUser.username,
            logged: true,
          };
        });
        // if user.logged and !userSess.logged it means that the user has just logged in
      } else if (user.logged && !userSess.logged) {
        setUserSess((prevUser) => {
          return {
            id: user.userId,
            username: user.username,
            logged: true,
          };
        });
        // if userSess is logged in but !user.logged and there is
        // cookie, it means that a refresh has happened so repopulate user
      } else if (userSess.logged && !user.logged && cookieExists === 0) {
        dispatch(setUser({ userId: userSess.id, username: userSess.username }));
      }
      // if userSess is logged in but !user.logged and there is no
      // cookie, it means the user has logged out so clear userSes
      else if (userSess.logged && !user.logged && cookieExists === -1) {
        console.log(`clearing state`);
        await setUserSess((prevUser) => {
          return {
            id: "",
            username: "",
            logged: false,
          };
        });
      }
    }
    // if myCookie === 0, session cookie exists, if -1, session cookie does not exist
    const myCookie = document.cookie.indexOf("session=");
    myCookie === 0 && getSession(myCookie);
  }, [user, userSess, dispatch]);

  // useeffect for the socket connection
  useEffect(() => {
    // Initialize the socket connection when the component mounts
    if (!socketRef.current) {
      socketRef.current = io.connect(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER}`
      );

      socketRef.current.on("new-notification", (eventData) => {
        console.log("New notification:", eventData);
        // create a notification
        dispatch(
          setNotification({
            type: "notify",
            message: `Your subscribed address has an updated ${eventData}`,
          })
        );
      });
    }

    // Cleanup the socket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // useEffect for webhook
  // * Currently this looks place to initiate webhook as all components are assembled here
  useEffect(() => {
    // Define a function to handle the webhook initialization
    const webhookHandler = () => {
      if (user.logged && !webhookInitialized.current) {
        // Only initiate the webhook if the user is logged in and the webhook hasn't been initialized yet
        initiateWebhook(user);
        webhookInitialized.current = true; // Mark the webhook as initialized
      }
    };

    // Call the handler immediately upon mounting
    webhookHandler();
  }, [user]); // Re-run this effect if the user data changes

  return (
    <React.Fragment>
      {notify.active && <Notify />}
      <Navbar />

      <div className="flex justify-between">
        <div className="p-4">
          <Header />
        </div>
        {user.logged && (
          <div className="">
            <Status />
          </div>
        )}
      </div>
      <div className="pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          {/* if user.logged display <Account/> else <Login/> decide whether to change the name of the route too */}
          <Route path="/user" element={user.logged ? <Account /> : <Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  );
}

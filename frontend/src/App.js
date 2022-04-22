import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// importing react-router
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Notify from "./components/Notify";
import { session } from "./modules/requests";
import { setUser } from "./store/UserSlice";

export default function App() {
  const [userSess, setUserSess] = useState({
    id: "",
    username: "",
    logged: false,
  });
  const notify = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // if there is a cookie in the browser retrieve user details and restore session
  useEffect(() => {
    console.log(`1st usereffect`);
    async function getSession() {
      // if user.logged and !userSess.logged it means that the user has just logged in
      if (user.logged && !userSess.logged) {
        setUserSess((prevUser) => {
          return {
            id: user.id,
            username: user.username,
            logged: true,
          };
        });
        // if there is no userSess logged in, check to see if there is a cookie
        // if so, log in the user and send the userSess.logged as a prop to Navbar
      } else if (!userSess.logged) {
        let loggedUser = await session();
        !loggedUser
          ? setUserSess((prevUser) => {
              return {
                id: "",
                username: "",
                logged: false,
              };
            })
          : setUserSess((prevUser) => {
              return {
                id: loggedUser.id,
                username: loggedUser.username,
                logged: true,
              };
            });
      }
    }
    getSession();
  }, [user, userSess]);

  useEffect(() => {
    console.log(`2nd usereffect`);
    // if useSess.logged, dispatch a copy of local state to the state.user store
    if (userSess.logged) {
      dispatch(setUser({ userId: userSess.id, username: userSess.username }));
    }
  }, [userSess]);

  return (
    <React.Fragment>
      {notify.active && <Notify />}
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        {/* if useSess.logged display <Account/> else <Login/> decide whether to change the name of the route too */}
        <Route
          path="/user"
          element={userSess.logged ? <Account /> : <Login />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

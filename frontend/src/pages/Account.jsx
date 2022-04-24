// Account page with logout facility
/*
Two panels, left panel with current details, right panel to appear only if user clicks on update details to display a panel to edit either username/email/password
button to cancel registration

*/

import React, { useState, useEffect } from "react";
import Updateusername from "../components/Updateusername";
import UserPanel from "../components/UserPanel";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userDetails } from "../modules/requests";
import { setNotification } from "../store/NotificationsSlice";
import { clearUser } from "../store/UserSlice";

export default function Account() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
  });
  const [updateDetails, setUpdateDetails] = useState({
    update: "",
  });

  const dispatch = useDispatch();
  // access the user state from the store
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getDetails() {
      const retrievedDetails = await userDetails(user.userId);
      setCurrentUser((prevCurrentUser) => {
        return { ...retrievedDetails };
      });
    }
    getDetails();
  }, [user]);

  function showUpdatePanel(choice) {
    if (choice === 1) {
      setUpdateDetails((prev) => {
        return {
          update: "username",
        };
      });
    }
  }

  function logout(message) {
    document.cookie = `session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    dispatch(clearUser());
    dispatch(
      setNotification({
        type: "success",
        message: message,
      })
    );
  }

  async function closeAccount() {
    const response = await deleteUser(user.userId);
    if (response) {
      logout("You have successfully closed your account!");
    } else {
      setNotification({
        type: "error",
        message: "An unknown error has prevented the closure of this account.",
      });
    }
  }

  return (
    <React.Fragment>
      {" "}
      <div className="text-center text-indigo-900 text-4xl">
        User Account
      </div>{" "}
      <div className="mx-4 flex flex-row">
        <button
          className="btn-gen"
          onClick={() => logout("You have successfully logged out!")}
        >
          logout
        </button>
        <button className="btn-danger" onClick={closeAccount}>
          close account
        </button>
      </div>
      {/* user details panel - submit data from currentUser as a prop */}
      <UserPanel userDetails={currentUser} showUpdatePanel={showUpdatePanel} />
      {updateDetails.update === "username" && <Updateusername />}
    </React.Fragment>
  );
}

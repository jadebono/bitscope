// Account page with logout facility
/*
Two panels, left panel with current details, right panel to appear only if user clicks on update details to display a panel to edit either username/email/password
button to cancel registration

*/

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../modules/requests";
import { setNotification } from "../store/NotificationsSlice";
import { clearUser } from "../store/UserSlice";

export default function Account() {
  const dispatch = useDispatch();

  // access the user state from the store
  const user = useSelector((state) => state.user);

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

  async function closeAccount(message) {
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
      <div className="text-center text-indigo-900 text-4xl">Account</div>{" "}
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
    </React.Fragment>
  );
}

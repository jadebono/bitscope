// Account page with logout facility
/*
Two panels, left panel with current details, right panel to appear only if user clicks on update details to display a panel to edit either username/email/password
button to cancel registration

*/

import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import { clearUser } from "../store/UserSlice";

export default function Account() {
  const dispatch = useDispatch();

  function logout() {
    document.cookie = `session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    dispatch(clearUser());
    dispatch(
      setNotification({
        type: "success",
        message: "You have successfully logged out!",
      })
    );
  }

  return (
    <React.Fragment>
      {" "}
      <div className="text-center text-indigo-900 text-4xl">Account</div>{" "}
      <div className="ml-4">
        <button className="btn-gen" onClick={logout}>
          logout
        </button>
      </div>
    </React.Fragment>
  );
}

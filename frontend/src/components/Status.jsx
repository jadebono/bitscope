// Status.jsx
import React from "react";
import { useSelector } from "react-redux";

function StatusPanel() {
  const user = useSelector((state) => state.user);
  const currency = user.currency;

  // If user is not logged in, don't render the panel
  if (!user.logged) return null;

  return (
    <div className="mr-4 mt-4 p-4 bg-gray-100 border-2 border-indigo-900  rounded-md shadow-md">
      <div>
        <h2 className="inline-block font-bold ">Status:</h2>{" "}
        <p className="inline-block text-red-900 font-bold">Logged in</p>
      </div>
      <div>
        <h2 className="inline-block font-bold ">Username:</h2>{" "}
        <p className="inline-block text-red-900 font-bold">{user.username}</p>
      </div>
      <div>
        <h2 className="inline-block font-bold ">Currency:</h2>{" "}
        <p className="inline-block text-red-900 font-bold">{currency}</p>
      </div>
    </div>
  );
}

export default StatusPanel;

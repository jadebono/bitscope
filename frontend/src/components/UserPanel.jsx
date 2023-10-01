// UserPanel for <Account/> component

import React, { useState, useEffect } from "react";
import { postUpdateCurrency } from "../modules/requests";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";

export default function UserPanel(props) {
  // get userDetails as a prop from <Account/> and populate the fields with it
  const userDetails = props.userDetails;
  const dispatch = useDispatch();

  // state for currency as currency update will be handled from here
  const [selectedCurrency, setSelectedCurrency] = useState(""); // initialized to empty string

  // useEffect to change selectedCurrency when userDetails change:

  useEffect(() => {
    // Update selectedCurrency whenever userDetails.currency changes
    if (props.userDetails.currency) {
      setSelectedCurrency(props.userDetails.currency);
    }
  }, [props.userDetails.currency]);

  // Access the userId from the Redux store
  const userId = useSelector((state) => state.user.userId);

  function handleCurrencyChange(evt) {
    // function to handle changes to the currency dropdown menu
    const value = evt.target.value;
    setSelectedCurrency(value);
  }

  async function handleChangeCurrencyButtonClick() {
    const response = await postUpdateCurrency({
      currency: selectedCurrency,
      userId: userId,
    });
    if (response === "currencyUpdated") {
      // Handle successful currency update (emit success notification)
      dispatch(
        setNotification({
          type: "success",
          message: "Currency updated!",
        })
      );
    } else {
      // handle currency update failure
      dispatch(
        setNotification({
          type: "warning",
          message: "Unknown problem. Currency not updated!",
        })
      );
    }
  }

  return (
    <React.Fragment>
      <div className="my-4 mx-auto w-5/6 md:w-1/2 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:mx-auto">
        <div className="flex flex-row ml-2">
          <div className="text-indigo-900 font-bold">Name:</div>
          <div className="rounded-md ml-9 w-5/6 font-bold">
            {userDetails.name}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-indigo-900 font-bold">Surname:</div>
          <div className="rounded-md ml-4 w-5/6 font-bold">
            {userDetails.surname}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-indigo-900 font-bold">Username:</div>
          <div className="rounded-md ml-2 w-5/6 font-bold">
            {userDetails.username}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-indigo-900 font-bold">Email:</div>
          <div className="rounded-md ml-10 w-5/6 font-bold">
            {userDetails.email}
          </div>
        </div>
        {/* experimental addition of currency */}
        <div className="flex flex-row ml-2">
          <div className="text-indigo-900 font-bold">Currency:</div>
          <div className="rounded-md ml-4 w-5/6 font-bold">
            {selectedCurrency}
          </div>
        </div>
        <div className="mx-1 mt-2 text-center text-lg font-semibold  text-orange-700">
          You may update your username, email, and password by clicking on the
          applicable buttons below
        </div>
        <div className="flex flex-row mb-2">
          <button className="btn-gen" onClick={() => props.togglePanel(1)}>
            username
          </button>
          <button className="btn-gen" onClick={() => props.togglePanel(2)}>
            email
          </button>
          <button className="btn-gen" onClick={() => props.togglePanel(3)}>
            password
          </button>
        </div>

        {/* currency div */}
        <div className="flex flex-row ml-2 mb-4 items-center">
          {" "}
          <div className="text-indigo-900 font-bold mt-5">Change currency:</div>
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="ml-2 mt-5 border border-indigo-900 rounded-md shadow-sm p-1 bg-white"
          >
            <option value="BTC">BTC</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <div className="ml-4 ">
            <button
              className="btn-gen"
              onClick={handleChangeCurrencyButtonClick}
            >
              Currency
            </button>
          </div>
        </div>
        {/* currency div ends here */}
      </div>
    </React.Fragment>
  );
}

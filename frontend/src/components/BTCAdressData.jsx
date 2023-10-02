// BTCAddressData.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBTCConversionRate, userDetails } from "../modules/requests";

function BTCAddressData({ data }) {
  const [conversionRate, setConversionRate] = useState(1); // Default to 1 for BTC
  const [currency, setCurrency] = useState("BTC"); // Default to BTC

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Check if a user is logged in
    if (user && user.userId) {
      // Fetch user details to get the currency
      userDetails(user.userId).then((userDetails) => {
        if (userDetails && userDetails.currency) {
          setCurrency(userDetails.currency);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    // If the currency is not BTC, fetch the conversion rate
    if (currency !== "BTC") {
      getBTCConversionRate(currency).then((rate) => {
        setConversionRate(rate);
      });
    }
  }, [currency]);

  //   since data is being retrieved in satoshis, it has to be converted to BTC first before converting it.
  const currentValue = ((data.balance / 100000000) * conversionRate).toFixed(2);

  return (
    <React.Fragment>
      <div className="my-4 mx-auto w-5/6 md:w-1/2 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Address:</label>
            <div className="rounded-md font-bold break-words">
              {data.address}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Number of confirmed transactions:
            </label>
            <div className="rounded-md font-bold">{data.final_n_tx}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Current Address Balance:
            </label>
            <div className="rounded-md font-bold">{data.balance / 1e6} BTC</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Current Address Value:
            </label>
            <div className="rounded-md font-bold">
              {currency} {currentValue}{" "}
              {/* Display the currency ticker before the amount */}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Total BTC Received:
            </label>
            <div className="rounded-md font-bold">
              {data.total_received / 1e6}{" "}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total BTC Sent:</label>
            <div className="rounded-md font-bold">{data.total_sent / 1e6}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BTCAddressData;

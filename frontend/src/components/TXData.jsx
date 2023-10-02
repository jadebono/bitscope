// TXData.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBTCConversionRate } from "../modules/requests";

function TXData({ data }) {
  const [conversionRate, setConversionRate] = useState(1); // Default to 1 for BTC

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // If the currency is not BTC, fetch the conversion rate
    if (user.currency !== "BTC") {
      getBTCConversionRate(user.currency).then((rate) => {
        setConversionRate(rate);
      });
    } else {
      setConversionRate(1); // Set conversionRate back to 1 if currency is BTC
    }
  }, [user.currency]); // Depend on user.currency instead of local currency state

  const status = data.confirmations > 0 ? "Confirmed" : "Unconfirmed";
  const totalInput = data.inputs ? data.inputs.length : 0;
  const totalOutput = data.outputs ? data.outputs.length : 0;
  let totalFees;
  if (user.currency === "BTC") {
    totalFees = `${(data.fees / 100000000).toFixed(8)} SATS`; // Display fees in SATS if the currency is BTC
  } else {
    totalFees = `${(data.fees * conversionRate).toFixed(0)} ${
      user.currency
    } cents`; // Convert fees to cents and display in user's preferred currency
  }

  return (
    <React.Fragment>
      <div className="my-4 mx-auto w-5/6 md:w-1/2 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Transaction Hash:
            </label>
            <div className="rounded-md font-bold break-words">{data.hash}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Received Time:</label>
            <div className="rounded-md font-bold">{data.received}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Status:</label>
            <div className="rounded-md font-bold">{status}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Size (in bytes):
            </label>
            <div className="rounded-md font-bold">{data.size}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Number of Confirmations:
            </label>
            <div className="rounded-md font-bold">{data.confirmations}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total Inputs:</label>
            <div className="rounded-md font-bold">{totalInput}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total Outputs:</label>
            <div className="rounded-md font-bold">{totalOutput}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total Fees:</label>
            <div className="rounded-md font-bold">
              {totalFees}
              {/* Display the currency ticker before the amount */}
            </div>
          </div>
        </div>
        {user.logged ? (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="btn-gen rounded-r-md "
              onClick={() => {
                /* !!TODO subscription logic */
              }}
            >
              Subscribe
            </button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default TXData;

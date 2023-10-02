// TXData.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBTCConversionRate, userDetails } from "../modules/requests";

function TXData({ data }) {
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

  const status = data.confirmations > 0 ? "Confirmed" : "Unconfirmed";
  const totalBTCInput = data.inputs
    ? data.inputs.reduce((sum, input) => sum + (input.value || 0), 0) /
      100000000
    : 0;
  const totalBTCOutput = data.outputs
    ? data.outputs.reduce((sum, output) => sum + output.value, 0) / 100000000
    : 0;
  const totalFees = ((data.fees / 100000000) * conversionRate).toFixed(2); // Assuming fees is in satoshis

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
            <label className="text-indigo-900 font-bold">
              Total BTC Input:
            </label>
            <div className="rounded-md font-bold">{totalBTCInput}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Total BTC Output:
            </label>
            <div className="rounded-md font-bold">{totalBTCOutput}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total Fees:</label>
            <div className="rounded-md font-bold">
              {currency} {totalFees}
              {/* Display the currency ticker before the amount */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TXData;

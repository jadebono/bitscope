// BTCAddressData.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getBTCConversionRate,
  postAddressSubscription,
} from "../modules/requests";

function BTCAddressData({ data }) {
  const [conversionRate, setConversionRate] = useState(1); // Default to 1 for BTC

  const user = useSelector((state) => state.user); // This will now include the currency

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

  // Since data is being retrieved in satoshis, it has to be converted to BTC first before converting it.
  const currentValue = ((data.balance / 100000000) * conversionRate).toFixed(2);

  const handleAddressSubscription = async () => {
    const response = await postAddressSubscription(data.address, user);
    /*  Handle the response: if successful response {
        emit succesful notification
        else {
            emit failed notification
        }
    }


*/
  };

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
              {user.currency} {currentValue}
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
        {user.logged ? (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="btn-gen rounded-r-md "
              onClick={handleAddressSubscription}
            >
              Subscribe
            </button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default BTCAddressData;

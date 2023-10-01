import React from "react";

function BTCAddressInfo({ data }) {
  return (
    <React.Fragment>
      <div className="my-4 mx-auto w-5/6 md:w-1/2 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Address:</label>
            <div className="rounded-md font-bold">{data.address}</div>
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
            <div className="rounded-md font-bold">{data.balance}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Current Address Value:
            </label>
            <div className="rounded-md font-bold">{data.value}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">
              Total BTC Received:
            </label>
            <div className="rounded-md font-bold">{data.total_received}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-900 font-bold">Total BTC Sent:</label>
            <div className="rounded-md font-bold">{data.total_sent}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BTCAddressInfo;

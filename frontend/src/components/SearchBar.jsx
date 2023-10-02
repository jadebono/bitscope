import React, { useState } from "react";
import { searchBitcoinBlockchain } from "../modules/requests";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";

export default function SearchBar({ setBlockchainData, setIsTransactionData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  function handleSearchChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    // Call the function to search the Bitcoin blockchain
    searchBitcoinBlockchain(searchTerm).then((data) => {
      if (data == null) {
        dispatch(
          setNotification({
            type: "error",
            message: "invalid search term!",
          })
        );
      } else {
        console.log("Blockchain data:", data);
        setBlockchainData(data);
        // Determine if the data is related to a transaction or address
        if (data && data.hash) {
          setIsTransactionData(true); // It's transaction data
        } else {
          setIsTransactionData(false); // It's address data
        }
      }
    });
    setSearchTerm("");
  }

  return (
    <React.Fragment>
      <div className="m-auto mb-20 md:mb-10 flex flex-col w-5/6 md:w-1/2 h-full mt-5 border-2 border-indigo-900 bg-indigo-50 rounded-2xl">
        <div className="my-2 text-xl text-indigo-900 font-bold text-center">
          Search
        </div>
        <form
          className="bg-white mb-4 w-5/6 m-auto rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-indigo-900  font-semibold"
          onSubmit={handleSearchSubmit}
        >
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="search">
              Search the Bitcoin blockchain
            </label>
          </div>
          <div className="flex items-center ml-4 mb-4">
            {" "}
            <input
              required
              name="search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-2/3 border border-indigo-900 rounded-md shadow-sm p-1 -mb-5 mr-2"
              placeholder="address or transaction id"
            />
            <button className="btn-gen rounded-r-md ">Search</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

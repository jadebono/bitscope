import React, { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    // TODO: implement your search logic here
    console.log("Search term submitted:", searchTerm);
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
              className="w-2/3 border border-indigo-900 rounded-md shadow-sm p-1 -mb-5"
              placeholder="address or transaction id"
            />
            <button className="btn-gen rounded-r-md">Search</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

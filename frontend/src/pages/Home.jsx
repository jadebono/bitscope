import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BTCAddressData from "../components/BTCAdressData";

export default function Home() {
  const [blockchainData, setBlockchainData] = useState(null);

  return (
    <React.Fragment>
      <h1 className="text-center text-indigo-900 text-5xl">Bitscope</h1>
      <h2 className="text-center text-indigo-900 text-3xl">
        A Bitcoin Blockchain Explorer
      </h2>
      <div>
        <SearchBar setBlockchainData={setBlockchainData} />
      </div>

      {blockchainData && <BTCAddressData data={blockchainData} />}
    </React.Fragment>
  );
}

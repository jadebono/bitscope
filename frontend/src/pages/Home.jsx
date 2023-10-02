import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BTCAddressData from "../components/BTCAdressData";
// Import the new TXData component
import TXData from "../components/TXData";

export default function Home() {
  const [blockchainData, setBlockchainData] = useState(null);
  const [isTransactionData, setIsTransactionData] = useState(false);

  useEffect(() => {
    console.log("blockchainData", blockchainData);
    console.log("isTransactionData", isTransactionData);
    // This is a simplistic check and may need to be replaced
    // with a more robust check depending on the actual shape of the data
    if (blockchainData && blockchainData.hash) {
      setIsTransactionData(true);
    } else {
      setIsTransactionData(false);
    }
  }, [blockchainData]);

  return (
    <React.Fragment>
      <h1 className="text-center text-indigo-900 text-5xl">Bitscope</h1>
      <h2 className="text-center text-indigo-900 text-3xl">
        A Bitcoin Blockchain Explorer
      </h2>
      <div>
        <SearchBar setBlockchainData={setBlockchainData} />
      </div>

      {isTransactionData ? (
        <TXData data={blockchainData} />
      ) : (
        blockchainData && <BTCAddressData data={blockchainData} />
      )}
    </React.Fragment>
  );
}

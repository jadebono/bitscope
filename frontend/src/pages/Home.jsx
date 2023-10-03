import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BTCAddressData from "../components/BTCAdressData";
import TXData from "../components/TXData";

export default function Home() {
  const [blockchainData, setBlockchainData] = useState(null);
  const [isTransactionData, setIsTransactionData] = useState(false);

  useEffect(() => {
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
        <div>
          <SearchBar
            setBlockchainData={setBlockchainData}
            setIsTransactionData={setIsTransactionData}
          />
        </div>
      </div>

      {isTransactionData ? (
        <TXData data={blockchainData} />
      ) : (
        blockchainData && <BTCAddressData data={blockchainData} />
      )}
    </React.Fragment>
  );
}

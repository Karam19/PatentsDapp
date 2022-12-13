import Head from "next/head";
import { useMoralis } from "react-moralis";
import React from "react";
import SearchComponent from "./../src/components/SearchComponent";

export default function Search() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for a patent" />
      </Head>

      <div className="text-column">
        {isWeb3Enabled ? (
          chainId === "5" ? (
            <div>
              <SearchComponent />
            </div>
          ) : (
            <div className="text-column"> Please connect to Goerli network</div>
          )
        ) : (
          <div className="text-column"> Please connect your wallet first!</div>
        )}
      </div>
    </>
  );
}

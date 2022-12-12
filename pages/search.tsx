import Head from "next/head";
import { useMoralis } from "react-moralis";
import React from "react";

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
              <h1>Search for a patent</h1>

              <p>Here you can search for a patent</p>
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

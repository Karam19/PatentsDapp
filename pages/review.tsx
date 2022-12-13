import Head from "next/head";
import React from "react";
import { useMoralis } from "react-moralis";
import AddReviewer from "../src/components/AddReviewer";

export default function Review() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  return (
    <>
      <Head>
        <title>Add a reviewer</title>
        <meta name="description" content="Add a reviewer" />
      </Head>

      <div className="text-column">
        {isWeb3Enabled ? (
          chainId === "5" ? (
            <AddReviewer />
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

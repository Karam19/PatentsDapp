import Head from "next/head";
import React from "react";
import SubmitForm from "./../src/components/SubmitForm";
import { useMoralis } from "react-moralis";

export default function Submit() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  return (
    <>
      <Head>
        <title>Submit</title>
        <meta name="description" content="Submit a patent" />
      </Head>

      <div className="text-column">
        {isWeb3Enabled ? (
          chainId === "5" ? (
            <div>
              <h1>Submit a patent</h1>

              <SubmitForm />
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

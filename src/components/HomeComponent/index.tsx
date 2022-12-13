import React, { useEffect } from "react";
import { abi, contractAddress } from "../../constants/contract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import PatentCard from "../PatentCard";

export default function HomeComponent() {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const [tokenId, setTokenId] = useState<number>(0);
  const options = {
    contractAddress: contractAddress,
    functionName: "tokenIds",
    abi: abi,
  };
  async function getTokenId() {
    const transaction: any = await Moralis.executeFunction(options);
    return parseInt(transaction._hex, 16);
  }
  useEffect(() => {
    const fetchToken = async () => {
      const _tokenId: any = await getTokenId();
      // console.log("Loaded from the chain a token id is: ", _tokenId);
      setTokenId(_tokenId);
    };
    fetchToken().catch(console.error);
  }, []);
  return (
    <div>
      {isWeb3Enabled ? (
        chainId === "5" ? (
          tokenId === 0 ? (
            <div>Loading Patent card ... </div>
          ) : (
            <div>
              <PatentCard tokenId={tokenId - 1} />
            </div>
          )
        ) : (
          <div className="text-column"> Please connect to Goerli network</div>
        )
      ) : (
        <div className="text-column"> Please connect your wallet first!</div>
      )}
    </div>
  );
}

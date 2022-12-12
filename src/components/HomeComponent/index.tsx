import { abi, contractAddress } from "../../constants/contract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import PatentCard from "../PatentCard";

export default function HomeComponent() {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const [tokenId, setTokenId] = useState();
  const options = {
    contractAddress: contractAddress,
    functionName: "_tokenIds",
    abi: abi,
  };
  async function getTokenId() {
    const transaction: any = await Moralis.executeFunction(options);
    console.log("Transaction is: ", parseInt(transaction._hex, 16));
  }
  return (
    <div>
      {/* <button
        onClick={async function () {
          await getTokenId();
        }}
      ></button> */}
      {isWeb3Enabled ? (
        chainId === "5" ? (
          <div>
            <PatentCard />
          </div>
        ) : (
          <div className="text-column"> Please connect to Goerli network</div>
        )
      ) : (
        <div className="text-column"> Please connect your wallet first!</div>
      )}
    </div>
  );
}

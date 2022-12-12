import { abi, contractAddress } from "../../constants/contract";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState } from "react";

export default function HomeComponent() {
  const [tokenId, setTokenId] = useState();
  const options = {
    contractAddress: contractAddress,
    functionName: "_tokenIds",
    abi: abi,
  };
  const { Moralis } = useMoralis();
  async function getTokenId() {
    const transaction: any = await Moralis.executeFunction(options);
    console.log("Transaction is: ", parseInt(transaction._hex, 16));
  }
  return (
    <div>
      <button
        onClick={async function () {
          await getTokenId();
        }}
      ></button>
    </div>
  );
}

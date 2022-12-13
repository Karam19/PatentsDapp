import React, { useEffect } from "react";
import { abi, contractAddress } from "../../constants/contract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import PatentCard from "../PatentCard";
import styles from "./SearchComponent.module.css";

export default function SearchComponent() {
  const { account, Moralis } = useMoralis();
  const [tokenId, setTokenId] = useState<number>(0);
  const [searchId, setSearchId] = useState("Search for a number");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [isReviewer, setIsReviewer] = useState<boolean>(false);

  async function getTokenId() {
    const options = {
      contractAddress: contractAddress,
      functionName: "tokenIds",
      abi: abi,
    };
    const transaction: any = await Moralis.executeFunction(options);
    return parseInt(transaction._hex, 16);
  }

  async function getIfReviewer() {
    const options = {
      contractAddress: contractAddress,
      functionName: "isuserReviewer",
      abi: abi,
      params: {
        addr: account,
      },
    };
    const transaction: any = await Moralis.executeFunction(options);
    console.log("Is reviewer equals to: ", transaction);
    return transaction;
  }

  useEffect(() => {
    const fetchToken = async () => {
      const _tokenId: any = await getTokenId();
      setTokenId(_tokenId);
    };
    const fetchReviewer = async () => {
      const _isReviewer: any = await getIfReviewer();
      setIsReviewer(_isReviewer);
    };
    fetchReviewer().catch(console.error);
    fetchToken().catch(console.error);
  }, []);

  function handleSearchIdChange(event: any) {
    const valueToSearch = event.target.value;
    if (valueToSearch < 0 || valueToSearch >= tokenId) {
      setSearchError(true);
    } else {
      setSearchId(valueToSearch);
      setSearchError(false);
    }
  }

  return (
    <div>
      <div className={styles.mainContrainer}>
        {isReviewer ? (
          <div className={styles.labelreview}>You are a reviewer</div>
        ) : (
          <div className={styles.labelreview}>
            You don't have a review access
          </div>
        )}
        {tokenId === 0 ? (
          <div>Loading ... </div>
        ) : (
          <div className={styles.mainContrainer}>
            <label className={styles.label}>Search for a patent by id</label>
            <br></br>
            <input
              className={styles.input}
              type="text"
              value={searchId}
              onChange={handleSearchIdChange}
            />{" "}
          </div>
        )}
        {searchError ? (
          <div className={styles.errortext}>
            {" "}
            Please choose a value between 0 and {tokenId - 1}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {searchId === "Search for a number" ? (
        <div></div>
      ) : (
        <div className="text-column">
          {" "}
          <PatentCard tokenId={Number(searchId)} />{" "}
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { abi, contractAddress } from "../../constants/contract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import styles from "./AddReviewer.module.css";

export default function AddReviewer() {
  const { account, Moralis } = useMoralis();
  const [address, setAddress] = useState<string>("Address");
  const [addrError, setAddrError] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  function handleAddressChange(event: any) {
    const addressValue = event.target.value;
    if (addressValue.length !== 42) {
      setAddrError(true);
    } else {
      setAddrError(false);
    }
    setAddress(addressValue);
  }

  async function getIfOwner() {
    const options = {
      contractAddress: contractAddress,
      functionName: "isUserOwner",
      abi: abi,
      params: {
        addr: account,
      },
    };
    const transaction: any = await Moralis.executeFunction(options);
    return transaction;
  }

  useEffect(() => {
    const fetchOwner = async () => {
      const _isOwner: any = await getIfOwner();
      setIsOwner(_isOwner);
    };
    fetchOwner().catch(console.error);
  }, [account]);

  async function AddAsReviewer() {
    const options = {
      contractAddress: contractAddress,
      functionName: "grantReviewPermission",
      abi: abi,
      params: {
        newReviewer: address,
      },
    };
    try {
      const transaction: any = await Moralis.executeFunction(options);
      alert(`Address ${address} was added to reviewers list successfully!`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddition() {
    if (addrError || address.length < 42) {
      alert("Your address is not valid");
    } else {
      await AddAsReviewer();
    }
  }

  return (
    <div>
      <div className={styles.mainContrainer}>
        {isOwner ? (
          <div className={styles.mainContrainer}>
            <label className={styles.label}>Search for a patent by id</label>
            <br></br>
            <input
              className={styles.input}
              type="text"
              value={address}
              onChange={handleAddressChange}
            />{" "}
            {addrError && (
              <div className={styles.errortext}> Your address isn't valid</div>
            )}
            <button
              type="submit"
              className={styles.button}
              onClick={async () => {
                await handleAddition();
              }}
            >
              Add
            </button>
          </div>
        ) : (
          <div>You don't have access to add reviewers</div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { abi, contractAddress } from "../../constants/contract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import styles from "./PendingList.module.css";

export default function PendingComponent(props: {
  tokenId: number;
  isReviewer: boolean;
}) {
  const { tokenId, isReviewer } = props;
  const { account, Moralis } = useMoralis();
  const [pendingPatents, setPendingPatents] = useState<number[]>([]);
  const [shown, setShown] = useState<boolean>(false);

  async function getTokenStatus(_tokenId: any) {
    console.log("we get for id: ", _tokenId);
    const options = {
      contractAddress: contractAddress,
      functionName: "patentStatus",
      abi: abi,
      params: {
        patentId: _tokenId,
      },
    };
    const transaction: any = await Moralis.executeFunction(options);
    const digitStatus = parseInt(transaction._hex, 16);
    console.log("For token number ", _tokenId, "Status is: ", digitStatus);
    if (digitStatus === 0) {
      console.log("existance", !pendingPatents.includes(_tokenId));
      if (!pendingPatents.includes(_tokenId)) {
        const tempPatents = pendingPatents;
        tempPatents.push(_tokenId);
        setPendingPatents(tempPatents);
      }
    }
    console.log(
      "For token number ",
      _tokenId,
      "  pending patent is: ",
      pendingPatents
    );
  }

  async function getAlltokensStatus() {
    if (tokenId !== 0) {
      for (let i = 0; i < tokenId; i++) {
        console.log("i is ", i);
        await getTokenStatus(i);
      }
    }
  }

  async function handleButtonClick() {
    setPendingPatents([]);
    await getAlltokensStatus();
    setShown(!shown);
  }

  return (
    <div>
      <div className={styles.mainContrainer}>
        {isReviewer ? (
          <button className={styles.button} onClick={handleButtonClick}>
            {shown ? (
              <div>Hide pending patents</div>
            ) : (
              <div>Show pending patents</div>
            )}
          </button>
        ) : (
          <div></div>
        )}
        {isReviewer ? (
          shown ? (
            pendingPatents.length > 0 ? (
              <div className={styles.mainContrainer}>
                Pending patents are
                <ul>
                  {pendingPatents.map((patent) => (
                    <li>{patent}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.labelreview}>
                All patents were reviewed
              </div>
            )
          ) : (
            <div></div>
          )
        ) : (
          <div className={styles.labelreview}>
            You don't have a review access
          </div>
        )}
      </div>
    </div>
  );
}

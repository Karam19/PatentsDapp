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
    if (digitStatus === 0) {
      if (!pendingPatents.includes(_tokenId)) {
        const tempPatents = pendingPatents;
        tempPatents.push(_tokenId);
        setPendingPatents(tempPatents);
      }
    }
  }

  async function getAlltokensStatus() {
    if (tokenId !== 0) {
      for (let i = 0; i < tokenId; i++) {
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

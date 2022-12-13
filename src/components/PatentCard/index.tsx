import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./PatentCard.module.css";
import { useMoralis } from "react-moralis";
import { abi, contractAddress } from "../../constants/contract";

export default function PatentCard(props: { tokenId: number }) {
  const { tokenId } = props;
  console.log("Token Id is: ", tokenId);
  const { Moralis } = useMoralis();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Loading ...");
  const [status, setStatus] = useState("Loading ...");
  const [owner, setOwner] = useState("Loading ...");
  const [date, setDate] = useState("Loading ...");
  const [keywords, setKeywords] = useState("Loading ...");
  const [description, setDescription] = useState("Loading ...");
  const [files, setFiles] = useState<{ name: string; link: string }[]>([]);

  async function getTokenStatus() {
    const options = {
      contractAddress: contractAddress,
      functionName: "patentStatus",
      abi: abi,
      params: {
        patentId: tokenId,
      },
    };
    const transaction: any = await Moralis.executeFunction(options);
    const digitStatus = parseInt(transaction._hex, 16);
    if (digitStatus === 0) {
      setStatus("Pending");
    } else if (digitStatus === 1) {
      setStatus("Accepted");
    } else if (digitStatus === 2) {
      setStatus("Rejected");
    }
  }

  async function getJsonFile(url: string) {
    const response = await fetch(url);
    return response.json();
  }

  async function getTokenUri() {
    const options = {
      contractAddress: contractAddress,
      functionName: "tokenURI",
      abi: abi,
      params: {
        tokenId: tokenId,
      },
    };
    const transaction: any = await Moralis.executeFunction(options);
    setUrl(transaction);
  }

  useEffect(() => {
    const fetchurl = async () => {
      await getTokenUri();
    };
    fetchurl().catch(console.error);
  }, [tokenId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJsonFile(url);
      if (url) {
        setTitle(data.Title);
        setOwner(data.Owner);
        setDate(data.SubmissionDate);
        setKeywords(data.Keywords);
        setDescription(data.Description);
        setFiles(data.Files);
      }
      console.log(data);
    };
    const fetchStatus = async () => {
      await getTokenStatus();
    };
    fetchStatus().catch(console.error);
    fetchData().catch(console.error);
  }, [url]);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Title</label> <br></br>
        </div>
        <label className={styles.childLabel}>{title}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Status</label> <br></br>
        </div>
        <label className={styles.childLabel}>{status}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Owner</label> <br></br>
        </div>
        <label className={styles.childLabel}>{owner}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Submission date</label> <br></br>
        </div>
        <label className={styles.childLabel}>{date}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Keywords</label> <br></br>
        </div>
        <label className={styles.childLabel}>{keywords}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Description</label> <br></br>
        </div>
        <label className={styles.childLabel}>{description}</label> <br></br>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Files</label> <br></br>
          <ul>
            {files &&
              files.map((file) => (
                <li>
                  <a href={file.link}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

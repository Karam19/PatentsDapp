import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./PatentCard.module.css";
import DropArea from "../DropArea";
import { useMoralis } from "react-moralis";
import StorageClient from "../../../utils/StorageClient";
import { abi, contractAddress } from "../../constants/contract";

export default function PatentCard() {
  const { account, Moralis } = useMoralis();
  const [url, setUrl] = useState(
    "https://bafybeieu5qyc6qmkmqg5pcx5r6lpyjofbmzis4zzv2krgadpcykuzld634.ipfs.dweb.link/c474fc01-5769-4db1-b808-1b563247ccc8.json"
  );
  const [title, setTitle] = useState("Loading ...");
  const [owner, setOwner] = useState("Loading ...");
  const [date, setDate] = useState("Loading ...");
  const [keywords, setKeywords] = useState("Loading ...");
  const [description, setDescription] = useState("Loading ...");
  const [files, setFiles] = useState<{ name: string; link: string }[]>([]);

  async function getJsonFile(url: string) {
    const response = await fetch(url);
    return response.json();
  }

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
    fetchData().catch(console.error);
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Title</label> <br></br>
        </div>
        <label className={styles.childLabel}>{title}</label> <br></br>
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

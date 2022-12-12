import React from "react";
import { useState } from "react";
import styles from "./SubmitForm.module.css";
import DropArea from "../DropArea";
import { useMoralis } from "react-moralis";
import StorageClient from "../../../utils/StorageClient";
import { abi, contractAddress } from "../../constants/contract";

export default function Layout() {
  const { account, Moralis } = useMoralis();
  const [title, setTitle] = useState("title");
  const [keywords, setKeywords] = useState("keywords");
  const [description, setDescription] = useState("description");
  const [currFiles, setCurrFiles] = useState<{ name: string; link: string }[]>(
    []
  );

  function handleSetCurrFiles(newName: string, newLink: string) {
    setCurrFiles(
      currFiles.concat({
        name: newName,
        link: newLink,
      })
    );
  }

  function handleTitleChange(event: any) {
    setTitle(event.target.value);
  }

  function handleKeywordsChange(event: any) {
    setKeywords(event.target.value);
  }

  function handleDescriptionChange(event: any) {
    setDescription(event.target.value);
  }

  function handleSubmission() {
    if (title.length === 0) {
      alert("Title can't be empty");
    } else if (description.length === 0) {
      alert("Description can't be empty");
    } else {
      uploadPatentWeb3();
    }
  }

  async function getSubmissionObject() {
    const toUpload = {
      Title: title,
      Owner: account,
      SubmissionDate: new Date().toLocaleDateString(),
      Keywords: keywords,
      Description: description,
      Files: currFiles,
    };
    console.log(toUpload);
    const blobFile = new Blob([JSON.stringify(toUpload)], {
      type: "application/json",
    });
    const file = new File([blobFile], "hello.json");
    const submitFile = await new StorageClient().storeFiles(file);
    console.log("Submit file is: ", submitFile);
    return submitFile[1];
  }

  async function submitPatentToContract(tokenURI: string) {
    const sendOptions = {
      contractAddress: contractAddress,
      functionName: "submitPatent",
      abi: abi,
      params: {
        tokenURI: tokenURI,
      },
    };
    const transaction = await Moralis.executeFunction(sendOptions);
    return transaction;
  }

  async function uploadPatentWeb3() {
    const tempWeb3URI = await getSubmissionObject();
    const transaction = await submitPatentToContract(tempWeb3URI);
    alert(
      `Your contract was submitted successfully!\nYou'r token Id is ${parseInt(
        transaction.hash._hex,
        16
      )} , use it to track the status of your patent.`
    );
    console.log(transaction);
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <label className={styles.label}>Title</label> <br></br>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={handleTitleChange}
          />{" "}
        </div>
        <div>
          <label className={styles.label}>Keywords</label> <br></br>
          <input
            className={styles.input}
            type="text"
            value={keywords}
            onChange={handleKeywordsChange}
          />{" "}
        </div>
        <div>
          <label className={styles.label}>Description</label> <br></br>
          <input
            className={styles.input}
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />{" "}
        </div>
        <div>
          <label className={styles.label}>Files</label> <br></br>
          <ul>
            {currFiles.map((file) => (
              <li>
                <a href={file.link}>{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <DropArea
            currFiles={currFiles}
            handleSetCurrFiles={handleSetCurrFiles}
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmission}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import styles from "./SubmitForm.module.css";
import DropArea from "../DropArea";

export default function Layout() {
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

  async function uploadPatentWeb3() {
    
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

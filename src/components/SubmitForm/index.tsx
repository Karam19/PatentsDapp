import React from "react";
import { useState, useEffect } from "react";
import styles from "./SubmitForm.module.css";

export default function Layout() {
  const [title, setTitle] = useState("title");
  const [keywords, setKeywords] = useState("keywords");
  const [description, setDescription] = useState("description");

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
    console.log("Title is: ", title);
    console.log("Keywords are: ", keywords);
    console.log("Description is: ", description);
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

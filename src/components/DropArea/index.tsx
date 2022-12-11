import { useState } from "react";
import styles from "./DropArea.module.css";
import StorageClient from "../../../utils/StorageClient";

const DropArea = (props: any) => {
  const { currFiles, handleSetCurrFiles } = props;
  const [data, setData] = useState<ArrayBuffer | string | null | undefined>(
    null
  );
  const [err, setErr] = useState<string | boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const { size, type } = files[0];
    setData(null);
    // Limit to either image/jpeg, image/jpg or image/png file
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    // Check file size to ensure it is less than 2MB.
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    setFile(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target?.result);
    };
  };

  const uploadFile = async () => {
    const newFile = await new StorageClient().storeFiles(file);
    handleSetCurrFiles(newFile[0], newFile[1]);
    setData(null);
  };

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e)}
        className={styles.card}
      >
        {data !== null && (
          <img className={styles.image} src={data?.toString()} />
        )}
        {data === null && (
          <p className={styles.dropAreaText}>Drag and drop file</p>
        )}
      </div>
      {err && <p>Unable to upload image</p>}
      {data !== null && (
        <div>
          <button className={styles.deleteButton} onClick={() => setData(null)}>
            Remove File
          </button>
          <button className={styles.uploadButton} onClick={() => uploadFile()}>
            Upload File
          </button>
        </div>
      )}
    </>
  );
};

export default DropArea;

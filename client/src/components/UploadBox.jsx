import { FaFileAlt } from "react-icons/fa";
import { useState } from "react";

function UploadBox(props) {

  const [dragActive, setDragActive] = useState(false);

  // When file is dragged over the box
  function handleDragOver(event) {
    event.preventDefault();
    setDragActive(true);
  }

  // When file leaves the box
  function handleDragLeave() {
    setDragActive(false);
  }

  // When file is dropped
  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);

    const files = event.dataTransfer.files;

    if (files.length > 0) {

      // Send dropped file to your existing handleFileChange
      props.handleFileChange({
        target: {
          files: files
        }
      });

    }
  }

  return (
    <div
      className={`upload-box ${dragActive ? "drag-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

      <FaFileAlt className="upload-icon" />

      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={props.handleFileChange}
        disabled={props.loading}
      />

      <p className="selected-file">
        Selected File:{" "}
        {props.selectedFile
          ? props.selectedFile.name
          : "No file selected"}
      </p>

    </div>
  );
}

export default UploadBox;
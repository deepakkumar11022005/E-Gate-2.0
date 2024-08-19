import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { color } from 'framer-motion';

const FileUpload = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="fileupload-container">
      <h2>Upload Database</h2>
      <form className="fileupload-form">
        {/* Input for entering batch name */}
        <div className="input-group">
          <div className="batch-name">
            <label htmlFor="batch-name">Batch Name :</label>
            <input type="text" id="batch-name" name="batch-name" placeholder=" Batch_2022-2026" required />
          </div>
          <div className="note">
            <p>
              <span style={{ color: "#ea4205", fontWeight: "bolder", fontSize: "1.2rem" }}> Note </span>
              : Please enter the batch name in the format: <strong>Batch_YYYY-YYYY</strong> (e.g., Batch_2022-2026).
            </p>
          </div>

        </div>

        {/* Drag and drop file upload section */}
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop file here, or click to select files</p>
          )}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="save-changes-btn">Save and Upload </button>
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import Error from '../Admin/Error';

const FileUpload = ({ handleUpload,error,setError, setUploadedBatchName, handleCancelUpload, uploadedBatchName,handleCloseError, setUploadFile, uploading }) => {
  const [fileError, setFileError] = useState(null); // To handle file errors

  const onDrop = useCallback(acceptedFiles => {
     
    setUploadFile(acceptedFiles[0]);
    setError(null)
  }, [setUploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadedBatchName) {
      setError('Please enter a batch name.');
      return;
    }
    if (!getInputProps().value) {
      setError('Please upload a file before submitting.');
      return;
    }
    handleUpload();  
  };

  return (
    <div className="fileupload-container">
      <h2>Upload Database</h2>
      <form className="fileupload-form" onSubmit={handleSubmit}>
         
        <div className="input-group">
          <div className="batch-name">
            <label htmlFor="batch-name">Batch Name :</label>
            <input 
              type="text" 
              id="batch-name" 
              name="batch-name" 
              placeholder="Batch_2022-2026" 
              required 
              value={uploadedBatchName}
              onChange={(e) => setUploadedBatchName(e.target.value)}
            />
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
            <p>Drag and drop a file here, or click to select a file</p>
          )}
        </div>

        {fileError && <p className="error-message">{fileError}</p>} {/* Display file error */}

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="save-changes-btn">
            {uploading ? (
              <span className="uploading-circle">
                <span className="circle"></span> Uploading...
              </span>
            ) :  error ? (  <Error error={error} onClose={handleCloseError} />) :(
              "Save and Upload"
            )}
          </button>

          <button 
            type="button" 
            className="cancel-btn" 
            onClick={handleCancelUpload}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;

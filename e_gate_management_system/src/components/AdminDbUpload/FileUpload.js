import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import Error from '../Admin/Error';

const FileUpload = ({ handleUpload, fileError, setSelectedFileName, selectedFileName, setFileError, error, setError, setUploadedBatchName, handleCancelUpload, uploadedBatchName, handleCloseError, setUploadFile, uploadFile,uploading }) => {

  const [fileUploadMsg,setFileUploadMsg]=useState(false);
  const onDrop = useCallback(acceptedFiles => {
    setUploadFile(acceptedFiles[0]);
    setSelectedFileName(acceptedFiles[0].name);
    setError(null);
  }, [setUploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadedBatchName) {
      setError('Please enter a batch name.');
      return;
    }
    if (!selectedFileName) {
      setError('Please upload a file before submitting.');
      return;
    }
    if(!uploadFile){
      setError('Please upload a file before submitting.');
    }
    if(handleUpload()){
     setFileUploadMsg(true);
    }
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
              : Please enter the batch name in the format : <strong>Batch_YYYY-YYYY</strong> (e.g., Batch_2022-2026) and <strong> Staff </strong> (e.g., Staff ).
            </p>
          </div>
        </div>

        {/* Drag and drop file upload section */}
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div>


              {selectedFileName ? (
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                  </svg>
                  <p className="file-indication">File selected: {selectedFileName}</p>
                </div>
              ) : (
                <>
                  <p>Drag and drop a file here, or click to select a file</p>
                  <p className="file-indication">No file selected</p></>
              )}
            </div>
          )}
        </div>

        {error &&  <Error error={error} onClose={handleCloseError} />}
        {fileError && <p className="error-message">{fileError}</p>}  

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="save-file-btn" >
            {uploading ? (
              <span className="uploading-circle">
                <span className="circle"></span> Uploading ...
              </span>
            ) :  (
              " Upload"
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

import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import FileUpload from '../components/AdminDbUpload/FileUpload';
import ExcistingDb from '../components/AdminDbUpload/ExcistingDb';
import Footer from '../components/Admin/Footer';

const AdminDbUpload = ({ API_URL, handleLogout, token }) => {
  const [existingBatch, setExistingBatch] = useState([]);
  const [uploadedBatchName, setUploadedBatchName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState(null);  
  const [selectedFileName, setSelectedFileName] = useState(''); 
  const postData = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('batch', uploadedBatchName);
      formData.append('file', uploadFile);
  
      const response = await fetch(`${API_URL}/kce/admin/batch/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,  
      });
  
      const data = await response.json();
      if (response.ok) {
        setUploadFile(null);
        setSelectedFileName(null);
        return true;
      } else {
        setUploadFile(null);
        setSelectedFileName(null);

        setError(data.errorMessage);
        return false;

      }
    } catch (error) {
      setError(error.message);
   
    } finally {
      setUploading(false);
    }
  };
  
  const fetchBatch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/batch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const commonResponse = await response.json();
      if (response.ok) {
        setExistingBatch(commonResponse.data.records);
        console.log(commonResponse.data.records);
      } else {
        throw new Error("Error Occurred while fetching batch details");
      }
    } catch (error) {
      setError(error.message);
      console.log("batch......................................"+error.message);

    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [uploading]);

  const handleUpload = () => {
    postData();
  };

  const handleCloseError = () => {
    setError(null);
    setLoading(false);
    setUploadedBatchName("");
  };

  const handleCancelUpload = () => {
    setUploading(false);
    setUploadFile(null);
    setUploadedBatchName("");
    setSelectedFileName("");
  };


  return (
    <div>
      <Header handleLogout={handleLogout} />
      <FileUpload
        handleUpload={handleUpload}
        handleCancelUpload={handleCancelUpload}
        uploadedBatchName={uploadedBatchName}
        setUploadFile={setUploadFile}
        uploading={uploading}
        uploadFile={uploadFile}
        error={error}
        handleCloseError={handleCloseError}
        setError={setError}
        setUploadedBatchName={setUploadedBatchName}
        fileError={fileError}
        setFileError={setFileError}
        selectedFileName={selectedFileName}
        setSelectedFileName={setSelectedFileName}
      />
      <ExcistingDb
        handleCloseError={handleCloseError}
        loading={loading}
        error={error}
        setError={setError}
        existingBatch={existingBatch}
      />
      <Footer />
    </div>
  );
};

export default AdminDbUpload;

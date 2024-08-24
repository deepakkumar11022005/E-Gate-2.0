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


  const postData = async () => {
    setUploading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/batch/add?batch=${uploadedBatchName}&file=${uploadFile}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         } 
      });
      const data = await response.json();
      if (data.code===201) {
        setUploading(false);
      } else {
        throw new Error("Error Occurred during upload");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error posting data:", error);
    } finally {
      setUploading(false);
    }
  };

  const fetchBatch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/bacth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const commonResponse = await response.json();
      if (response.ok) {
        setExistingBatch(commonResponse.data.records);
      } else {
        throw new Error("Error Occurred while fetching batch details");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
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

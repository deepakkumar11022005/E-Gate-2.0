import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import FileUpload from '../components/AdminDbUpload/FileUpload';
import ExcistingDb from '../components/AdminDbUpload/ExcistingDb';
import Footer from '../components/Admin/Footer';

const AdminDbUpload = ({ API_URL,handleLogout }) => {
  const [existingBatch, setExistingBatch] = useState([]);
  const [uploadedBatchName, setUploadedBatchName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const postData = async () => {
    setUploading(true);
    try {
      const response = await fetch(`${API_URL}/uploadFile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadFile)
      });
      const data = await response.json();
      if (response.ok && data.ResponseStatus === 'UPLOADED') {
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/getBatchDetails`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok && data.ResponseStatus === 'SUCCESS') {
        setExistingBatch(data);
      } else {
        throw new Error("Error Occurred while fetching batch details");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      uploading = false;
    }
  };

  useEffect(() => {
    // setExistingBatch([
    //   'Batch_2020-2026',
    //   'Batch_2018-2024',
    //   'Batch_2017-2023',
    // ]);
    // fetchData();
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

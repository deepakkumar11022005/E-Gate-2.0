import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import './AdminSearchEntry.css'; // Add this CSS file for styling
import Filter from '../components/AdminSearch/Filter';
import PersonInfoTable from '../components/Admin/PersonInfoTable';
import FilterCountAndDownload from '../components/AdminSearch/FilterCountAndDownload';
import Footer from '../components/Admin/Footer';
import Loading from '../components/Admin/Loading';
import Error from '../components/Admin/Error';

const AdminSearchEntry = ({ API_URL,handleLogout }) => {
  // const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  // const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  // const [fromTime, setFromTime] = useState(new Date().toTimeString().split(' ')[0]);
  // const [toTime, setToTime] = useState(new Date().toTimeString().split(' ')[0]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [batch, setBatch] = useState([]);
  const [tableEntries, setTableEntries] = useState([]);
  const [filterCount, setFilterCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchLoading,setBatchLoading]=useState(false);
  const handleSearch = () => {

    fetchData(); // Call fetchData when search is triggered
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromDate, toDate, fromTime, toTime, rollNumber, batch })
      });
      if (response.ok) {
        const data = await response.json();
        setTableEntries(data);
        setFilterCount(data.length);
      } else {
        throw new Error("Data not received");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

 const fetchBatch = async () => {
    setBatchLoading(true);
    try {
      const response = await fetch(`${API_URL}/filter`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
      });
      if (response.ok) {
        const data = await response.json();
        setBatch(data.data);
      } else {
        throw new Error("Data not received");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setBatchLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchBatch();
  }, []);

  const handleCloseError = () => {
    setError(null);
    setLoading(false);
  };
  
  

  return (
    <div>
      <Header handleLogout={handleLogout}/>
      <Filter
        fromDate={fromDate}
        toDate={toDate}
        fromTime={fromTime}
        toTime={toTime}
        batch={batch}
        rollNumber={rollNumber}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setFromTime={setFromTime}
        setToTime={setToTime}
        setRollNumber={setRollNumber}
        setBatch={setBatch}
        handleSearch={handleSearch}
        batchLoading={batchLoading}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} onClose={handleCloseError} />
      ) : (
        <>
          <FilterCountAndDownload filterCount={filterCount} />
          <PersonInfoTable tableEntries={tableEntries} />
        </>
      )}



      <Footer />
    </div>
  );
};

export default AdminSearchEntry;

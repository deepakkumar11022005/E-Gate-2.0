import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Admin/Header';
import './AdminSearchEntry.css'; // Add this CSS file for styling
import Filter from '../components/AdminSearch/Filter';
import PersonInfoTable from '../components/Admin/PersonInfoTable';
import FilterCountAndDownload from '../components/AdminSearch/FilterCountAndDownload';
import Footer from '../components/Admin/Footer';
import Loading from '../components/Admin/Loading';
import Error from '../components/Admin/Error';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminSearchEntry = ({ API_URL, handleLogout, token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batch, setBatch] = useState([]);
  const [tableEntries, setTableEntries] = useState([]);
  const [filterCount, setFilterCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [pageNo, setPageNo] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const handleSearch = () => {
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let filterUrl = new URLSearchParams();

      if (rollNumber) filterUrl.append('rollNumber', rollNumber);
      if (fromDate) filterUrl.append('fromDate', fromDate);
      if (toDate) filterUrl.append('toDate', toDate);
      if (fromTime) filterUrl.append('fromTime', fromTime);
      if (toTime) filterUrl.append('toTime', toTime);
      if (selectedBatch) filterUrl.append('batch', selectedBatch);
      filterUrl.append("page", pageNo);
      filterUrl.append("size", pageSize);

      const response = await fetch(`${API_URL}/kce/admin/entry?${filterUrl.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const commonResponse = await response.json();
      if (response.ok) {
        setTableEntries(commonResponse.data.records);
        setFilterCount(commonResponse.data.totalCount);
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
      const response = await fetch(`${API_URL}/kce/admin/batch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const commonResponse = await response.json();
      if (response.ok) {
        setBatch(commonResponse.data.records);
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
  }, [pageNo]);

  const handleCloseError = () => {
    setError(null);
    setLoading(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      let filterUrl = new URLSearchParams();

      if (rollNumber) filterUrl.append('rollNumber', rollNumber);
      if (fromDate) filterUrl.append('fromDate', fromDate);
      if (toDate) filterUrl.append('toDate', toDate);
      if (fromTime) filterUrl.append('fromTime', fromTime);
      if (toTime) filterUrl.append('toTime', toTime);
      if (selectedBatch) filterUrl.append('batch', selectedBatch);
      filterUrl.append('page', 0);
      filterUrl.append('size', 8000);

      const response = await fetch(`${API_URL}/kce/admin/entry?${filterUrl.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const commonResponse = await response.json();
      if (response.ok) {
        const data = commonResponse.data.records || [];

        const processedData = data.map(entry => ({
          Batch: entry.batch,
          RollNumber: entry.rollNumber,
          Name: entry.name,
          Department: entry.dept,
          Indate: entry.inDate,
          InTime: entry.inTime,
          Outdate: entry.outDate,
          OutTime: entry.outTime,
          Status: entry.status,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(processedData, { origin: 6 });

        // XLSX.utils.sheet_add_aoa(ws, [
        //   ['E-Gate Management System'],
        //   [`Date: ${new Date().toLocaleDateString()}`],
        //   ['Batch:', selectedBatch || 'All', 'From Date:', fromDate || 'N/A', 'From Time:', fromTime || 'N/A'],
        //   ['', '', 'To Date:', toDate || 'N/A', 'To Time:', toTime || 'N/A'],
        //   ['Total Entries:', data.length]
        // ], { origin: 'A1' });

        ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 30 }, { width: 25 }, { width: 20 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `E_Gate_EntryDetails_${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        throw new Error('Data not received');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setDownloading(false);
    }
  };

  const handlePageChange = (newPageNo) => {
    if (newPageNo >= 0 && newPageNo * pageSize < filterCount) {
      setPageNo(newPageNo);
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <Filter
        fromDate={fromDate}
        toDate={toDate}
        fromTime={fromTime}
        toTime={toTime}
        batch={batch}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        rollNumber={rollNumber}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setFromTime={setFromTime}
        setToTime={setToTime}
        setRollNumber={setRollNumber}
        handleSearch={handleSearch}
        batchLoading={batchLoading}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} onClose={handleCloseError} />
      ) : (
        <>
          <FilterCountAndDownload
            filterCount={filterCount}
            handleDownload={handleDownload}
            loading={downloading}
          />
          <PersonInfoTable
            totalEntries={filterCount}
            pageSize={pageSize}
            pageNo={pageNo}
            onPageChange={handlePageChange}
            currentEntries={tableEntries}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default AdminSearchEntry;

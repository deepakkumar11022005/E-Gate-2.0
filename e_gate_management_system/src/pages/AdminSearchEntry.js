import React, { useEffect, useState } from 'react';
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
import KCELOGO from '../images/KCE.png'
const AdminSearchEntry = ({ API_URL, handleLogout, token }) => {

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
      filterUrl.append("size", pageSize);
      filterUrl.append("page", pageNo);

       
      const response = await fetch(`${API_URL}/kce/admin/entry?${filterUrl.toString()}`, {
        method: 'POST',
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
  }, []);

  const handleCloseError = () => {
    setError(null);
    setLoading(false);
  };
 
  
  const handleDownload = async () => {
      setDownloading(true);
      try {
          // let filterUrl = new URLSearchParams();
    
          // if (rollNumber) filterUrl.append('rollNumber', rollNumber);
          // if (fromDate) filterUrl.append('fromDate', fromDate);
          // if (toDate) filterUrl.append('toDate', toDate);
          // if (fromTime) filterUrl.append('fromTime', fromTime);
          // if (toTime) filterUrl.append('toTime', toTime);
          // if (selectedBatch) filterUrl.append('batch', selectedBatch);
          // filterUrl.append('size', pageSize);
          // filterUrl.append('page', pageNo);
    
          // const response = await fetch(`${API_URL}/kce/admin/entry?${filterUrl.toString()}`, {
          //     method: 'POST',
          //     headers: {
          //         'Content-Type': 'application/json',
          //         'Authorization': `Bearer ${token}`,
          //     },
          // });
    
          // const commonResponse = await response.json();
          // if (response.ok) {
          //     const data = commonResponse.data.records || [];
      const data = [
        {
          batch: "2021",
          rollNumber: "21CS001",
          name: "John Doe",
          dept: "Computer Science",
          inDate: "2024-08-24",
          inTime: "09:00 AM",
          outDate: "2024-08-24",
          outTime: "05:00 PM",
          status: "Present"
        },
        {
          batch: "2021",
          rollNumber: "21CS002",
          name: "Jane Smith",
          dept: "Computer Science",
          inDate: "2024-08-24",
          inTime: "09:15 AM",
          outDate: "2024-08-24",
          outTime: "04:45 PM",
          status: "Present"
        },
        {
          batch: "2020",
          rollNumber: "20EE003",
          name: "Alice Johnson",
          dept: "Electrical Engineering",
          inDate: "2024-08-24",
          inTime: "08:45 AM",
          outDate: "2024-08-24",
          outTime: "05:15 PM",
          status: "Present"
        },
        {
          batch: "2019",
          rollNumber: "19ME004",
          name: "Bob Brown",
          dept: "Mechanical Engineering",
          inDate: "2024-08-24",
          inTime: "09:05 AM",
          outDate: "2024-08-24",
          outTime: "04:55 PM",
          status: "Present"
        },
        {
          batch: "2022",
          rollNumber: "22CE005",
          name: "Charlie Green",
          dept: "Civil Engineering",
          inDate: "2024-08-24",
          inTime: "09:10 AM",
          outDate: "2024-08-24",
          outTime: "05:10 PM",
          status: "Present"
        }
      ];
      
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
           
              XLSX.utils.sheet_add_aoa(ws, [
                ['E-Gate Management System'],
                [`Date: ${new Date().toLocaleDateString()}`],
                ['Batch:', selectedBatch || 'All', 'From Date:', fromDate || 'N/A', 'From Time:', fromTime || 'N/A'],
                ['', '', 'To Date:', toDate || 'N/A', 'To Time:', toTime || 'N/A'],
                ['Total Entries:', data.length]
              ], { origin: 'A1' });
          
              ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 30 }, { width: 25 }, { width: 20 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }];
              ws['!rows'] = [{ ht: 20 }, { ht: 25 }, { ht: 20 }, { ht: 20 }, { ht: 20 }, { ht: 20 }, { ht: 25 }];
              
              for (const cell in ws) {
                if (ws[cell] && ws[cell].v) {
                  ws[cell].s = { font: { name: 'Times New Roman' } };
                }
              }
          
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
              const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              saveAs(blob, `E_Gate_EntryDetails_${new Date().toISOString().split('T')[0]}.xlsx`);
          // } else {
          //     throw new Error('Data not received');
          // }
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
           currentEntries={tableEntries} />
        </>
      )}



      <Footer />
    </div>
  );
};

export default AdminSearchEntry;

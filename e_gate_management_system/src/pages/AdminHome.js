import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import './AdminHome.css';
import Main from '../components/AdminHome/Main';
import Footer from '../components/Admin/Footer';
import CurrentEntryTable from '../components/AdminHome/CurrentEntryTable';
import Loading from '../components/Admin/Loading';
import Error from '../components/Admin/Error';

const AdminHome = ({ API_URL,handleLogout }) => {
  const [todayEntryInCount, settodayEntryInCount] = useState(0);
  const [studentEntryInCount, setStudentEntryInCount] = useState(0);
  const [staffEntryInCount, setStaffEntryInCount] = useState(0);
  const [todayEntryOutCount, settodayEntryOutCount] = useState(0);
  const [studentEntryOutCount, setStudentEntryOutCount] = useState(0);
  const [staffEntryOutCount, setStaffEntryOutCount] = useState(0);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(5);
  const [pageNo, setPageNo] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const entryResponse = await fetch(`${API_URL}/get/entryDetails`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const entryData = await entryResponse.json();
  
      if (entryResponse.ok && entryData.ResponseStatus === 'SUCCESS') {
        const data = entryData.data;
        setStudentEntryInCount(data.studentEntryInCount || 0);
        setStudentEntryOutCount(data.studentEntryOutCount || 0);
        setStaffEntryInCount(data.staffEntryInCount || 0);
        setStaffEntryOutCount(data.staffEntryOutCount || 0);
        settodayEntryInCount((data.staffEntryInCount || 0) + (data.studentEntryInCount || 0));
        settodayEntryOutCount((data.staffEntryOutCount || 0) + (data.studentEntryOutCount || 0));
      } else {
        throw new Error(entryData.errorMessage || "Unexpected error occurred");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentDetails = async (pageNo, pageSize) => {
    setLoading(true);
    try {
      const entryResponse = await fetch(`${API_URL}/get/entryDetails?page=${pageNo}&size=${pageSize}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const entryData = await entryResponse.json();
  
      if (entryResponse.ok && entryData.ResponseStatus === 'SUCCESS') {
        const data = entryData.data;
        setCurrentEntries(data.entries || []);
        setTotalEntries(data.totalEntries || 0);
      } else {
        throw new Error(entryData.errorMessage || "Unexpected error occurred");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentEntries([
      { sno: 1, batch: 'Batch A', rollNum: '717822P212', name: 'John Doe', department: 'CS', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
      { sno: 2, batch: 'Batch B', rollNum: '12346', name: 'Jane Smith', department: 'IT', inDate: '2024-08-14', inTime: '09:15 AM', outDate: '2024-08-14', outTime: '05:15 PM', status: 'Present' },
      { sno: 3, batch: 'Batch A', rollNum: '12347', name: 'Alice Johnson', department: 'ECE', inDate: '2024-08-14', inTime: '09:20 AM', outDate: '2024-08-14', outTime: '05:20 PM', status: 'Present' },
      { sno: 4, batch: 'Batch B', rollNum: '12348', name: 'Bob Brown', department: 'MECH', inDate: '2024-08-14', inTime: '09:25 AM', outDate: '2024-08-14', outTime: '05:25 PM', status: 'Present' },
      { sno: 5, batch: 'Batch C', rollNum: '12349', name: 'Charlie Davis', department: 'CIVIL', inDate: '2024-08-14', inTime: '09:30 AM', outDate: '2024-08-14', outTime: '05:30 PM', status: 'Present' },
      { sno: 6, batch: 'Batch D', rollNum: '12350', name: 'Dana White', department: 'BIO', inDate: '2024-08-14', inTime: '09:35 AM', outDate: '2024-08-14', outTime: '05:35 PM', status: 'Present' },
      { sno: 7, batch: 'Batch E', rollNum: '12351', name: 'Eva Green', department: 'EEE', inDate: '2024-08-14', inTime: '09:40 AM', outDate: '2024-08-14', outTime: '05:40 PM', status: 'Present' },
      { sno: 8, batch: 'Batch F', rollNum: '12352', name: 'Frank Black', department: 'CHEM', inDate: '2024-08-14', inTime: '09:45 AM', outDate: '2024-08-14', outTime: '05:45 PM', status: 'Present' },
      { sno: 9, batch: 'Batch G', rollNum: '12353', name: 'Gina Miller', department: 'PHY', inDate: '2024-08-14', inTime: '09:50 AM', outDate: '2024-08-14', outTime: '05:50 PM', status: 'Present' },
      { sno: 10, batch: 'Batch H', rollNum: '12354', name: 'Hank Lee', department: 'MATH', inDate: '2024-08-14', inTime: '09:55 AM', outDate: '2024-08-14', outTime: '05:55 PM', status: 'Present' },
    ]);
    fetchCurrentDetails(pageNo, pageSize);
  }, [pageNo]);

  const handleCloseError = () => {
    setError(null);
    setLoading(false); 
  };

  const handlePageChange = (newPageNo) => {
    if (newPageNo >= 0 && newPageNo * pageSize < totalEntries) {
      setPageNo(newPageNo);
    }
  };

  return (
    <div className="admin-home">
      <Header handleLogout={handleLogout} />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} onClose={handleCloseError} />
      ) : (
        <>
          <Main
            todayEntryInCount={todayEntryInCount}
            todayEntryOutCount={todayEntryOutCount}
            studentEntryInCount={studentEntryInCount}
            studentEntryOutCount={studentEntryOutCount}
            staffEntryInCount={staffEntryInCount}
            staffEntryOutCount={staffEntryOutCount}
          />
          <div className='current-entry-head'>Current Entries</div>
          <CurrentEntryTable 
            currentEntries={currentEntries}
            totalEntries={totalEntries}
            pageSize={pageSize}
            pageNo={pageNo}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default AdminHome;

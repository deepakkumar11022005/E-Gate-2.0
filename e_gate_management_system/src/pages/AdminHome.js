import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import './AdminHome.css';
import Main from '../components/AdminHome/Main';
import Footer from '../components/Admin/Footer';
import CurrentEntryTable from '../components/AdminHome/CurrentEntryTable';
import Loading from '../components/Admin/Loading';
import Error from '../components/Admin/Error';
import { useNavigate } from 'react-router-dom';
const AdminHome = ({ API_URL, handleLogout, token }) => {
    
  console.log("home rendered");
  // const navigate = useNavigate();
  // useEffect(() => {
  //     if (!token) {
  //         navigate('/');
  //     }
  // }, [token, navigate]);
  const [todayEntryInCount, settodayEntryInCount] = useState(0);
  const [studentEntryInCount, setStudentEntryInCount] = useState(0);
  const [staffEntryInCount, setStaffEntryInCount] = useState(0);
  const [todayEntryOutCount, settodayEntryOutCount] = useState(0);
  const [studentEntryOutCount, setStudentEntryOutCount] = useState(0);
  const [staffEntryOutCount, setStaffEntryOutCount] = useState(0);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(30);
  const [pageNo, setPageNo] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchData = async () => {
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/today/utils`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      
      const commonResponse = await response.json();

      if (response.ok) {

        const data = commonResponse.data;
        console.log(data);
        
        setStudentEntryInCount(data.studentInCount || 0);
        setStudentEntryOutCount(data.studentOutCount || 0);
        setStaffEntryInCount(data.staffInCount || 0);
        setStaffEntryOutCount(data.staffOutCount || 0);
        settodayEntryInCount((data.staffInCount || 0) + (data.studentInCount || 0));
        settodayEntryOutCount((data.staffOutCount || 0) + (data.studentOutCount || 0));
      } else {
        throw new Error(commonResponse.errorMessage || "Unexpected error occurred");
      }
    } catch (error) {
      console.log("count .................");
      
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentDetails = async (pageNo, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/today/entry?page=${pageNo}&size=${pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const commonResponse = await response.json();

      if (response.ok) {
        const data = commonResponse.data;
        setCurrentEntries(data.records || []);
        setTotalEntries(data.totalCount || 0);
      } else {
        throw new Error(commonResponse.errorMessage || "Unexpected error occurred");
      }
    } catch (error) {
      console.log("details .................");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    fetchData();
     
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

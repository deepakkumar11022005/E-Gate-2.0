import React, { useEffect, useState } from 'react';
import Header from '../components/Admin/Header';
import './AdminHome.css';
import Main from '../components/AdminHome/Main';
import Footer from '../components/Admin/Footer';
import CurrentEntryTable from '../components/AdminHome/CurrentEntryTable';
import Loading from '../components/Admin/Loading';
import Error from '../components/Admin/Error';

const AdminHome = ({ API_URL }) => {
  const [todayEntryInCount, settodayEntryInCount] = useState(0);
  const [studentEntryInCount, setStudentEntryInCount] = useState(0);
  const [staffEntryInCount, setStaffEntryInCount] = useState(0);
  const [todayEntryOutCount, settodayEntryOutCount] = useState(0);
  const [studentEntryOutCount, setStudentEntryOutCount] = useState(0);
  const [staffEntryOutCount, setStaffEntryOutCount] = useState(0);
  const [currentEntries, setCurrententries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageSize,setPageSize]=useState(0);
  const [pageNo,setPageNo]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const entryResponse = await fetch(`${API_URL}/get/entryDetails`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  })
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
        // setError(error.message);
        
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();

    setCurrententries([
      { sno: 1, rollNum: '717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
      { sno: 2, rollNum: '12346', name: 'Jane Smith', inDate: '2024-08-14', inTime: '09:15 AM', outDate: '2024-08-14', outTime: '05:15 PM', status: 'Present' }
      // Add more mock data as needed
    ]);
  }, []);

  const handleCloseError = () => {
    setError(null);
    setLoading(false); 
  };

  return (
    <div className="admin-home">
      <Header />
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
          <CurrentEntryTable currentEntries={currentEntries} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default AdminHome;

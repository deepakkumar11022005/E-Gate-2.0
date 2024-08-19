import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Entry from './pages/Entry';
import AdminHome from './pages/AdminHome';
import Search from './pages/AdminSearchEntry';
import Account from './pages/AdminAccount';
import ManageBatch from './pages/AdminDbUpload';
import PageNotFound from './pages/PageNotFound';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const data = [

        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 1, rollNum: ' 717822P212', name: 'John Doe', inDate: '2024-08-14', inTime: '09:00 AM', outDate: '2024-08-14', outTime: '05:00 PM', status: 'Present' },
        { sno: 2, rollNum: '12346', name: 'Jane Smith', inDate: '2024-08-14', inTime: '09:15 AM', outDate: '2024-08-14', outTime: '05:15 PM', status: 'Present' },
        // Add more data as needed
      ];
    useEffect(() => {
        
        if (location.pathname.includes('/admin')) {
            setRole('admin');
        } else if (location.pathname.includes('/entry')) {
            setRole('Entry');
        }
    }, [location]);

    const handleLogin = (userRole) => {
        // console.log("User role is:", userRole);   
        setIsLoggedIn(true);
        setRole(userRole);

        
        if (userRole === 'admin') {
            navigate('/admin/home');
        } else if (userRole === 'Entry') {
            navigate('/entry');
        }
    };

    // useEffect(() => {
    //     console.log("Role set to:", role);   
    // }, [role]);

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Routes>
            {/* Route for Admin */}
            <Route path="/admin">
                <Route path="home" element={role === 'admin' ? <AdminHome data={data}/> : <Navigate to="/" />} />
                <Route path="search" element={role === 'admin' ? <Search data={data}/> : <Navigate to="/" />} />
                <Route path="manage-batch" element={role === 'admin' ? <ManageBatch /> : <Navigate to="/" />} />
                <Route path="account" element={role === 'admin' ? <Account /> : <Navigate to="/" />} />
            </Route>

            {/* Route for Entry */}
            <Route path="/entry" element={role === 'Entry' ? <Entry /> : <Navigate to="/" />} />

            {/* Default Route: Redirect to correct home based on role */}
            <Route path="/" element={<Navigate to={role === 'admin' ? "/admin/home" : role === 'Entry' ? "/entry" : "/"} />} />

            {/* Catch-all Route */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;

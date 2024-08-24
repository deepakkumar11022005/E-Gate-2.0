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
    const API_URL = "http://localhost:8080";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("717822p212@kce.ac.in");
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (location.pathname.includes('/admin')) {
            setRole('admin');
        } else if (location.pathname.includes('/entry')) {
            setRole('Entry');
        }
    }, [location]);

    const handleLogin = () => {
        setIsLoggedIn(true);
        if (role === 'admin') {
            navigate('/admin/home');
        } else if (role === 'Entry') {
            navigate('/entry');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole(null);  
        setToken(null);
        navigate('/');
    };

    if (!isLoggedIn) {
        return <Login
            onLogin={handleLogin}
            API_URL={API_URL}
            token={token}
            setToken={setToken}
        />;
    }

    return (
        <Routes>
            {/* Route for Admin */}
            <Route path="/admin">
                <Route path="home" element={role === 'admin' ? <AdminHome API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/" />} />
                <Route path="search" element={role === 'admin' ? <Search API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/" />} />
                <Route path="manage-batch" element={role === 'admin' ? <ManageBatch API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/" />} />
                <Route path="account" element={role === 'admin' ? <Account API_URL={API_URL} handleLogout={handleLogout} email={email} token={token} /> : <Navigate to="/" />} />
            </Route>

            {/* Route for Entry */}
            <Route path="/entry" element={role === 'Entry' ? <Entry API_URL={API_URL} token={token} /> : <Navigate to="/" />} />

            {/* Default Route: Redirect to correct home based on role */}
            <Route path="/" element={<Navigate to={role === 'admin' ? "/admin/home" : role === 'Entry' ? "/entry" : "/"} />} />

            {/* Catch-all Route */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;

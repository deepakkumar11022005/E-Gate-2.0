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
    const API_URL = "https://e-gate-20-production.up.railway.app";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let storedToken, storedRole;
        
        // Check if it's admin or entry page and load respective session data
        if (location.pathname.startsWith('/admin')) {
            storedToken = localStorage.getItem('adminAuthToken');
            storedRole = localStorage.getItem('adminRole');
        } else if (location.pathname.startsWith('/entry')) {
            storedToken = localStorage.getItem('entryAuthToken');
            storedRole = localStorage.getItem('entryRole');
        }

        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setRole(storedRole);
        } else {
            setIsLoggedIn(false);
            setRole(null);
        }
    }, [location]);

    const handleLogin = (role, token,email) => {
        // Store token and role separately based on the role
        setEmail(email);
        if (role === 'admin') {
            localStorage.setItem('adminAuthToken', token);
            localStorage.setItem('adminRole', role);
        } else if (role === 'Entry') {
            localStorage.setItem('entryAuthToken', token);
            localStorage.setItem('entryRole', role);
        }
        setIsLoggedIn(true);
        setRole(role);
        setToken(token);
        navigate(role === 'admin' ? '/admin/home' : '/entry');
    };

    const handleLogout = async () => {
        let logoutUrl = role === "Entry" ? `/kce/entry/logout?email=${email}` : "/auth/logout";

        try {
            const response = await fetch(`${API_URL}${logoutUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const commonResponse = await response.json();
            if (response.ok) {
                setIsLoggedIn(false);
                setRole(null);
                setToken(null);
                if (role === 'admin') {
                    localStorage.removeItem('adminAuthToken');
                    localStorage.removeItem('adminRole');
                } else if (role === 'Entry') {
                    localStorage.removeItem('entryAuthToken');
                    localStorage.removeItem('entryRole');
                }
                navigate('/');
            } else {
                console.error("Logout failed:", commonResponse.errorMessage);
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    if (!isLoggedIn) {
        if (location.pathname.startsWith('/admin')) {
            return (
                <Routes>
                    <Route path="/admin/*" element={<Login onLogin={handleLogin} API_URL={API_URL} role="admin" setToken={setToken} setLoggedEmail={setEmail} setRole={setRole} />} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
            );
        }
        if (location.pathname.startsWith('/entry')) {
            return (
                <Routes>
                    <Route path="/entry/*" element={<Login onLogin={handleLogin} API_URL={API_URL} role="Entry" setToken={setToken} setLoggedEmail={setEmail} setRole={setRole} />} />
                    <Route path="*" element={<Navigate to="/entry" />} />
                </Routes>
            );
        }
        return <Navigate to="/admin" />;
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to={role === 'admin' ? "/admin/home" : role === 'Entry' ? "/entry" : "/"} />} />
            <Route path="/admin/*" element={role === 'admin' ? <AdminHome API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/search" element={role === 'admin' ? <Search API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/manage-batch" element={role === 'admin' ? <ManageBatch API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/account" element={role === 'admin' ? <Account API_URL={API_URL} handleLogout={handleLogout} token={token} email={email}/> : <Navigate to="/admin" />} />
            <Route path="/entry" element={role === 'Entry' ? <Entry API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/entry" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;

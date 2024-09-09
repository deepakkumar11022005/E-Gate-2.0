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
import kceLogo from './images/kce.gif';
import OAuth2 from './components/Login/OAuth2'
const App = () => {
    const API_URL = "https://e-gate-20-production.up.railway.app";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogin = async (role, token, email) => {
        try {
            setEmail(email);
            if (role === 'admin') {
                localStorage.setItem("loginEmail", email);
                localStorage.setItem('adminAuthToken', token);
                localStorage.setItem('adminRole', role);
            } else if (role === 'entry') {
                localStorage.setItem("loginEmail", email);
                localStorage.setItem('entryAuthToken', token);
                localStorage.setItem('entryRole', role);
            }
     
            setIsLoggedIn(true);
            setRole(role);
            setToken(token);
    
           
            navigate(role === 'admin' ? '/admin/home' : '/entry');
    
        } catch (error) {
            console.error("Login error:", error);
            
        }
    };


    const handleLogout = async () => {
        setLogoutLoading(true);
        let logoutUrl = role === "entry" ? `/kce/entry/logout` : "/auth/logout";
        console.log("Attempting to log out:", role, email, token);

        try {
            const response = await fetch(`${API_URL}${logoutUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // navigate('/');
            }
        } catch (error) {

            alert("Network error during logout:", error);

        }
        finally {
            clearSessionData();
            // navigate('/');
            setLogoutLoading(false);
        }
    };

    const clearSessionData = () => {
        setIsLoggedIn(false);
        setRole(null);
        setToken(null);
        if (role === 'admin') {
            localStorage.removeItem('adminAuthToken');
            localStorage.removeItem('adminRole');
        } else if (role === 'entry') {
            localStorage.removeItem('entryAuthToken');
            localStorage.removeItem('entryRole');
        }
        localStorage.removeItem("loginEmail");
    };



    useEffect(() => {
        let storedToken, storedRole;


        if (location.pathname.startsWith('/admin')) {
            storedToken = localStorage.getItem('adminAuthToken');
            storedRole = localStorage.getItem('adminRole');

        } else if (location.pathname.startsWith('/entry')) {
            storedToken = localStorage.getItem('entryAuthToken');
            storedRole = localStorage.getItem('entryRole');
        }
        setEmail(localStorage.getItem("loginEmail"));
        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setRole(storedRole);
        } else {
            setIsLoggedIn(false);
            setRole(null);
        }
    }, [location, handleLogout]);

    useEffect(() => {
        let storedToken, storedRole;

        if (location.pathname.startsWith('/admin')) {
            storedToken = localStorage.getItem('adminAuthToken');
            storedRole = localStorage.getItem('adminRole');
        } else if (location.pathname.startsWith('/entry')) {
            storedToken = localStorage.getItem('entryAuthToken');
            storedRole = localStorage.getItem('entryRole');
        }
        setEmail(localStorage.getItem("loginEmail"));
        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setRole(storedRole);
        } else {
            setIsLoggedIn(false);
            setRole(null);
        }

        const handleTabClose = (e) => {

            if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
                console.log('Page reload detected, no session clearing');
                return;
            }

            clearSessionData();
        };

        window.addEventListener('beforeunload', handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
    }, [location]);

    useEffect(() => {
        const setFavicon = (url) => {
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        };

        setFavicon(kceLogo);
        switch (location.pathname) {
            case '/admin/home':
                document.title = 'Admin Home - E-Gate Management System';
                break;
            case '/admin/search':
                document.title = 'Search - E-Gate Management System';
                break;
            case '/admin/manage-batch':
                document.title = 'Manage Batch - E-Gate Management System';
                break;
            case '/admin/account':
                document.title = 'Account - E-Gate Management System';
                break;
            case '/entry':
                document.title = 'Entry - E-Gate Management System';
                break;
            default:
                document.title = 'E-Gate Management System';
                break;
        }
    }, [location]);
    if (!isLoggedIn) {
        if (location.pathname.startsWith('/admin')) {
            return (
                <Routes>
                    {/* <Route path="/auth/oauth2/callback/*" element={<OAuth2 API_URL={API_URL} setLoggedEmail={setEmail} setToken={setToken} setRole={setRole} onLogin={(role, token, email) => handleLogin(role, token, email)} />} /> */}
                    <Route path="/admin/*"
                        element={<Login
                            onLogin={async (role, token, email) => await handleLogin(role, token, email)}
                            API_URL={API_URL}
                            role="admin"
                            setToken={setToken}
                            setLoggedEmail={setEmail}
                            setRole={setRole}
                        />}
                    />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
            );
        }

        if (location.pathname.startsWith('/entry')) {
            return (
                <Routes>
                    {/* <Route path="/auth/oauth2/callback/*" element={<OAuth2 onLogin={(role, token, email) => handleLogin(role, token, email)}  setLoggedEmail={setEmail} setToken={setToken} setRole={setRole} />} /> */}
                    <Route path="/entry/*"
                        element={<Login
                            onLogin={async (role, token, email) => await handleLogin(role, token, email)}
                            API_URL={API_URL}
                            role="admin"
                            setToken={setToken}
                            setLoggedEmail={setEmail}
                            setRole={setRole}
                        />}
                    />
                    <Route path="*" element={<Navigate to="/entry" />} />
                </Routes>
            );
        }

        return <Navigate to="/entry" />;
    }


    return (
        <Routes>
            {/* <Route path="/" element={<Navigate to={role === 'admin' ? "/admin" : role === 'Entry' ? "/entry" : "/"} />} /> */}
            <Route path="/admin/*" element={role === 'admin' ? <AdminHome API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/search" element={role === 'admin' ? <Search API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/manage-batch" element={role === 'admin' ? <ManageBatch API_URL={API_URL} handleLogout={handleLogout} token={token} /> : <Navigate to="/admin" />} />
            <Route path="/admin/account" element={role === 'admin' ? <Account API_URL={API_URL} handleLogout={handleLogout} token={token} email={email} /> : <Navigate to="/admin" />} />
            <Route path="/entry" element={role === 'entry' ? <Entry API_URL={API_URL} handleLogout={handleLogout} token={token} logoutLoading={logoutLoading} /> : <Navigate to="/entry" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import './Entry.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/EntryModule/Header';
import InOutAndTimeUpdate from '../components/EntryModule/InOutAndTimeUpdate';
import EntryForm from '../components/EntryModule/EntryForm';
import PersonDetails from '../components/EntryModule/PersonDetails';
import WelcomeMessage from '../components/EntryModule/WelcomeMessage';
import LogoutBar from '../components/EntryModule/LogoutBar';

const Entry = ({ API_URL, token ,handleLogout,logoutLoading}) => {
   
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    const [time, setTime] = useState(new Date().toLocaleString());
    const [inCount, setInCount] = useState(0);
    const [outCount, setOutCount] = useState(0);
    const [infoRollnumber,setInfoRollNumber]=useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [status, setStatus] = useState(false);
    const [error, setError] = useState("");
    const [outDate, setOutDate] = useState("");
    const [inDate, setInDate] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [entryLoading, setEntryLoading] = useState(false);

    const convertTo12HourFormat = (time24) => {
        if (!time24) return null;

        const [hour, minutes] = time24.split(':');
        let hourNum = parseInt(hour, 10);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        hourNum = hourNum % 12 || 12;

        return `${hourNum}:${minutes} ${ampm}`;
    };
    const makeEntry = async (rollNumber) => {
        console.log(rollNumber + "/////////////////////////////");
        setEntryLoading(true);
        try {
            if (!rollNumber) {
                setError("Roll number is required.");
                return;
            }

            const response = await fetch(`${API_URL}/kce/entry/add?rollNumber=${rollNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const commonResponse = await response.json();

            if (response.ok) {
                if (commonResponse.data) {
                    const {
                        rollNumber,
                        name,
                        dept,
                        batch,
                        inDate,
                        outDate,
                        inTime,
                        outTime,
                        status
                    } = commonResponse.data;

                    setInfoRollNumber(rollNumber);
                    setName(name);
                    setDepartment(dept);
                    setBatch(batch);
                    setInDate(inDate);
                    setOutDate(outDate);
                    setInTime(convertTo12HourFormat(inTime));
                    setOutTime(convertTo12HourFormat(outTime));
                    setStatus(status === "OUT");
                    setError("");
                } else {
                    setError("Unexpected response format.");
                    setStatus(false);
                }
            } else {
                setError(commonResponse.errorMessage || `Something went wrong. HTTP Status: ${response.status}`);
                setStatus(false);
            }
        } catch (error) {
            setError(error.message || "An unknown error occurred.");
            setStatus(false);
        } finally {
            setEntryLoading(false);
            setRollNumber("");
        }
    };
    const fetchInOutCount = async () => {
        console.log("count...............")
        try {
            const response = await fetch(`${API_URL}/kce/entry/today/utils`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const commonResponse = await response.json();

            if (response.ok) {
                setInCount(commonResponse.data.studentInCount + commonResponse.data.staffInCount);
                setOutCount(commonResponse.data.studentOutCount + commonResponse.data.staffOutCount);
            } else {
                setError(commonResponse.errorMessage || "Failed to fetch in/out counts.");
            }
        } catch (error) {
            setError(error.message || "An unknown error occurred while fetching counts.");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

      

        return () => clearInterval(interval);
    }, []);
    useEffect(()=>{
        fetchInOutCount();
    },[status])



    const handleCloseMsg = () => {
        setError(null); 
    };

    useEffect(() => {
        const timer = error && setTimeout(() => {
            setError(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [error]);

    return (
        <div className="container"  tabIndex="0">
            <Header />
            <InOutAndTimeUpdate inCount={inCount} outCount={outCount} time={time} />
            <EntryForm
                rollNumber={rollNumber}
                setRollNumber={setRollNumber}
                makeEntry={makeEntry}
            />
            <PersonDetails
                rollNumber={infoRollnumber}
                name={name}
                batch={batch}
                department={department}
                inDate={inDate}
                outDate={outDate}
                inTime={inTime}
                outTime={outTime}
                error={error}
                handleCloseMsg={handleCloseMsg}
            />
            <WelcomeMessage 
                status={status}
                entryLoading={entryLoading}
            />
              <LogoutBar handleLogout={handleLogout} logoutLoading={logoutLoading} /> 
        </div>
    );
};

export default Entry;

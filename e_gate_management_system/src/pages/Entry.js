import React, { useState, useEffect } from 'react';
import './Entry.css';
import Header from '../components/EntryModule/Header';
import InOutAndTimeUpdate from '../components/EntryModule/InOutAndTimeUpdate';
import EntryForm from '../components/EntryModule/EntryForm';
import PersonDetails from '../components/EntryModule/PersonDetails';
import WelcomeMessage from '../components/EntryModule/WelcomeMessage';

const Entry = ({ API_URL, token }) => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const [inCount, setInCount] = useState(0);
    const [outCount, setOutCount] = useState(0);
    const [rollNumber, setRollNumber] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [status, setStatus] = useState(false);
    const [enteredRollNumber, setEnteredRollNumber] = useState("");
    const [error, setError] = useState("");
    const [outDate, setOutDate] = useState("");
    const [inDate, setInDate] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");

    const convertTo12HourFormat = (time24) => {
        if (!time24) return null;

        const [hour, minutes] = time24.split(':');
        let hourNum = parseInt(hour, 10);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        hourNum = hourNum % 12 || 12;

        return `${hourNum}:${minutes} ${ampm}`;
    };

    const makeEntry = async (rollNumber) => {
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

                    setRollNumber(rollNumber);
                    setName(name);
                    setDepartment(dept);
                    setBatch(batch);
                    setInDate(inDate);
                    setOutDate(outDate);
                    setInTime(convertTo12HourFormat(inTime));
                    setOutTime(convertTo12HourFormat(outTime));
                    setStatus(status === "OUT");
                    setError(""); // Clear any previous errors
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
        }
    };

    const fetchInOutCount = async () => {
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

        if (enteredRollNumber) {
            makeEntry(enteredRollNumber);
        }

        fetchInOutCount();

        return () => clearInterval(interval);
    }, [enteredRollNumber]);

    const handleCloseMsg = () => {
        setError(null); 
    };

    return (
        <div className="container">
            <Header />
            <InOutAndTimeUpdate inCount={inCount} outCount={outCount} time={time} />
            <EntryForm
                rollNumber={enteredRollNumber}
                setRollNumber={setEnteredRollNumber}
                makeEntry={makeEntry}
            />
            <PersonDetails
                rollNumber={rollNumber}
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
            <WelcomeMessage status={status} />
        </div>
    );
};

export default Entry;

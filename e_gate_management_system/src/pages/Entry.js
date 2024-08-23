import React, { useState, useEffect } from 'react';
import './Entry.css';
import Header from '../components/EntryModule/Header';
import InOutAndTimeUpdate from '../components/EntryModule/InOutAndTimeUpdate';
import EntryForm from '../components/EntryModule/EntryForm';
import PersonDetails from '../components/EntryModule/PersonDetails';
import WelcomeMessage from '../components/EntryModule/WelcomeMessage';

const Entry = ({ API_URL }) => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const [inCount, setInCount] = useState(0);
    const [outCount, setOutCount] = useState(0);
    const [rollNumber, setRollNumber] = useState("717822p212");
    const [name, setName] = useState("DEEPAKKUMAR S");
    const [department, setDepartment] = useState("CSE");
    const [batch, setBatch] = useState("2022 - 2026");
    const [status, setStatus] = useState(true);
    const [enteredRollNumber, setEnteredRollNumber] = useState("");
    const [error, setError] = useState("");

    const makeEntry = async (rollNumber) => {
        try {
            const response = await fetch(`${API_URL}/entry/${rollNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.ResponseStatus === 'SUCCESS') {
                setRollNumber(data.data.rollNumber);
                setName(data.data.name);
                setBatch(data.data.batch);
                setDepartment(data.data.department);
                setStatus(true);
            } else {
                setError(data.errorMessage || "Something went wrong, please contact the developer.");
                setStatus(false);
            }
        } catch (error) {
            setError(error.message);
            setStatus(false);
        }
    };

    const getInOutCount = async () => {
        try {
            const response = await fetch(`${API_URL}/inout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.ResponseStatus === 'SUCCESS') {
                setInCount(data.inCount);
                setOutCount(data.outCount);
            }
        } catch (error) {
            // Handle error if needed
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        getInOutCount();

        return () => clearInterval(interval);
    }, []);

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
            />
            <WelcomeMessage status={status} />
        </div>
    );
}

export default Entry;

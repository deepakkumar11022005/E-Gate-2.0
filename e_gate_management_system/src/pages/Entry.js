import React, { useState, useEffect } from 'react';
import './Entry.css';
import Header from '../components/EntryModule/Header';
import InOutAndTimeUpdate from '../components/EntryModule/InOutAndTimeUpdate';
import EntryForm from '../components/EntryModule/EntryForm';
import PersonDetails from '../components/EntryModule/PersonDetails';
import WelcomeMessage from '../components/EntryModule/WelcomeMessage';

const Entry = () => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const [inCount, setInCount] = useState(0);  
    const [outCount, setOutCount] = useState(0); 
    const [enteredRollnumber,setEnteredRollNumber]=useState("");
    const [personDetails, setPersonDetails] = useState({
        rollNumber: '717822P212',
        name: 'DEEPAKKUMAR S',
        department: 'CSE', 
        batch: '2022 - 2026',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="container">
            <Header />
            <InOutAndTimeUpdate inCount={inCount} outCount={outCount} time={time} />
            <EntryForm 
            enteredRollnumber={enteredRollnumber}
            setEnteredRollNumber={setEnteredRollNumber}
            
            />
            <PersonDetails {...personDetails} />
            <WelcomeMessage />
        </div>
    );
}

export default Entry;

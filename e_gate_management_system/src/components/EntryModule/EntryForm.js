import React, { useRef, useEffect } from 'react';

const EntryForm = ({ rollNumber, setRollNumber, makeEntry }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        setRollNumber(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default Enter key action
            handleMakeEntry(e);
        }
    };

    const handleMakeEntry = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await makeEntry(rollNumber);
    };

    return (
        <form id="entryForm" onSubmit={handleMakeEntry}>
            <div className="input-rollno">
                <label htmlFor="rollNo">
                    <span>Roll Number</span> <span>:</span>
                </label>
                <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    required
                    autoFocus
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // Handle key down events
                    ref={inputRef}
                />
            </div>
        </form>
    );
};

export default EntryForm;

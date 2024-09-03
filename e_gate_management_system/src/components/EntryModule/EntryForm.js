import React, { useRef, useEffect } from 'react';

const EntryForm = ({ rollNumber, setRollNumber, makeEntry }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleMakeEntry = async (e) => {
        e.preventDefault();
        console.log(rollNumber+"**********************")
        const response = await makeEntry(rollNumber);
        if (response) {
            setRollNumber("");
        } else {
            setRollNumber("");
        }
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
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    ref={inputRef}
                />
            </div>
        </form>
    );
};

export default EntryForm;

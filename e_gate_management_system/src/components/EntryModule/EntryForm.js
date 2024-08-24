import React, { useRef, useEffect } from 'react';

const EntryForm = ({ rollNumber, setRollNumber, makeEntry }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [rollNumber]); // Focus on the input whenever rollNumber changes

    function handleChange(e) {
        setRollNumber(e.target.value);
        makeEntry(e.target.value);  
    }

    return (
        <form id="entryForm" method="get" name="rollNumber" action="entrySubmit">
            <div className="input-rollno">
                <label htmlFor="rollNo"><span>Roll Number</span> <span>:</span></label>
                <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    required
                    autoFocus
                    onChange={handleChange}
                    ref={inputRef}
                />
            </div>
        </form>
    );
}

export default EntryForm;

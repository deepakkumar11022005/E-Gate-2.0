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
       const response= await makeEntry(rollNumber);
       if(response ){
        
        // alert("Entry made successfully");
        }
        else{
            // alert("Error in making entry");
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
                    onChange={(e) => setRollNumber(e.target.value)}
                    // onKeyDown={handleKeyDown} // Handle key down events
                    ref={inputRef}
                />
            </div>
        </form>
    );
};

export default EntryForm;

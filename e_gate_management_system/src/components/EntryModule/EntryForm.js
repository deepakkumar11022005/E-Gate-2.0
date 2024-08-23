import React from 'react'

const EntryForm = ({rollNumber,setRollNumber,makeEntry}) => {
    function handleChange(e){
        setRollNumber(e.target.value)
        makeEntry(rollNumber);
    }
  return (
    <form id="entryForm" method="get" name="rollNumber" action="entrySubmit">
    <div className="input-rollno">
        <label htmlFor="rollNo" ><span >Roll Number</span> <span >:</span></label>
        <input type="text" id="rollNo" name="rollNo" required autoFocus onChange={handleChange} />
    </div>
</form>
  )
}

export default EntryForm

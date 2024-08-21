 import React from 'react'
 
 const CurrentEntryTable = ({currentEntries}) => {
   return (
    <div className="person-info-container">
           

    {/* Row 2: Table */}
    <div className="table-container">
        <table className="person-info-table">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Batch</th>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>In Date</th>
                    <th>In Time</th>
                    <th>Out Date</th>
                    <th>Out Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {currentEntries.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.sno}</td>
                        <td>{entry.bacth}</td>
                        <td>{entry.rollNum}</td>
                        <td>{entry.name}</td>
                        <td>{entry.department}</td>
                        <td>{entry.inDate}</td>
                        <td>{entry.inTime}</td>
                        <td>{entry.outDate}</td>
                        <td>{entry.outTime}</td>
                        <td>{entry.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
   )
 }
 
 export default CurrentEntryTable
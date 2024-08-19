import React from 'react';
import './PersonInfoTable.css';
import FilterCountAndDownload from '../AdminSearch/FilterCountAndDownload';

const PersonInfoTable = ({data}) => {
    // Sample data for demonstration purposes
   

    return (
        <div className="person-info-container">
           

            {/* Row 2: Table */}
            <div className="table-container">
                <table className="person-info-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>In Date</th>
                            <th>In Time</th>
                            <th>Out Date</th>
                            <th>Out Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sno}</td>
                                <td>{item.rollNum}</td>
                                <td>{item.name}</td>
                                <td>{item.inDate}</td>
                                <td>{item.inTime}</td>
                                <td>{item.outDate}</td>
                                <td>{item.outTime}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonInfoTable;

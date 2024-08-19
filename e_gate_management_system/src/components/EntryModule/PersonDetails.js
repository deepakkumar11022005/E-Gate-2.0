import React from 'react';
import scanningImg from '../../images/scanning.gif';


const PersonDetails = ({ rollNumber, name, department, batch }) => (
    <div id="details">
        <div className="person_details">
            <h3>Information</h3>
            <div className="person_info">
                <div className="person_info_question">
                    <div className="person_info_span"><span>Roll Number</span><span>:</span> </div>
                    <div className="person_info_span"><span>Name</span><span>:</span></div>
                    <div className="person_info_span"><span>Department</span><span>:</span></div>
                    <div className="person_info_span"><span>Year</span><span>:</span></div>
                </div>
                <div className="person_info_answer_from_db">
                    <div className="person_info_span">{rollNumber}</div>
                    <div className="person_info_span">{name}</div>
                    <div className="person_info_span">{department}</div>
                    <div className="person_info_span">{batch}</div>
                </div>
            </div>
        </div>
        <div className="person_img">
            <img src={scanningImg} alt="Scanning" height="120px" width="200px" />
        </div>
    </div>
);

export default PersonDetails;

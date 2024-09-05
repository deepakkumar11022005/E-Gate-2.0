import React from 'react';
import scanningImg from '../../images/scanning.gif';

import EntryMessage from './EntryMessage';

const PersonDetails = ({ rollNumber, name, department, batch, inDate, outDate, inTime, outTime, error, handleCloseMsg }) => (
    <div id="details">
        {error && (
            <EntryMessage
                message={error}  
            />
        )}
        <div className="person_details">
            <h3>Information</h3>
            <div className="person_info">
                <div className="person_info_question">
                    <div className="person_info_span"><span>Roll Number</span><span>:</span> </div>
                    <div className="person_info_span"><span>Name</span><span>:</span></div>
                    <div className="person_info_span"><span>Department</span><span>:</span></div>
                    <div className="person_info_span"><span>Batch</span><span>:</span></div>
                    <div className="person_info_span"><span>In at</span><span>:</span></div>
                    <div className="person_info_span"><span>Out at</span><span>:</span></div>
                </div>
                <div className="person_info_answer_from_db">
                    <div className="person_ans_span">{rollNumber}</div>
                    <div className="person_ans_span">{name || " ---"}</div>
                    <div className="person_ans_span">{department || " ---"}</div>
                    <div className="person_ans_span">{batch|| " ---"}</div>
                    <div className="person_ans_span">{(inDate || " ---") + " " +(inTime || " ---") }</div>
                    <div className="person_ans_span">{(outDate || " ---")+ " " + (outTime || " ---")}</div>
                </div>
            </div>
        </div>
        <div className="person_img">
            <img src={scanningImg} alt="Scanning" height="120px" width="200px" />
        </div>
    </div>
);

export default PersonDetails;

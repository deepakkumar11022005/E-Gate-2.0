import React from 'react';

const InOutAndTimeUpdate = ({ inCount, outCount, time }) => (
    <div className="inOutAndTimeUpdate">
        <div className="count_update">
            <div>In: {outCount}</div>/
            <div>Out: {  inCount}</div>
        </div>
        <div id="time">{time}</div>
    </div>
);

export default InOutAndTimeUpdate;

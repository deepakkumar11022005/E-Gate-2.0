import React from 'react';

const InOutAndTimeUpdate = ({ inCount, outCount, time }) => (
    <div className="inOutAndTimeUpdate">
        <div className="count_update">
            <div>In: {inCount}</div>/
            <div>Out: {outCount}</div>
        </div>
        <div id="time">{time}</div>
    </div>
);

export default InOutAndTimeUpdate;

import React from 'react';

const WelcomeMessage = ({ status }) => (
    <div className={status ? "welcome_green" : "welcome_red"}>
        {status ? "Welcome to KCE" : "Thank you, visit again"}
    </div>
);

export default WelcomeMessage;

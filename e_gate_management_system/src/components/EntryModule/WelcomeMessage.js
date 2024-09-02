import React from 'react';
import EntryLoading from './EntryLoading';

const WelcomeMessage = ({ status, entryLoading }) => (
    <div className={status ? "welcome_green" : "welcome_red"}>
        {entryLoading ? (
            <EntryLoading />
        ) : (
            status ? "Welcome to KCE" : "Thank you, visit again"
        )}
    </div>
);

export default WelcomeMessage;

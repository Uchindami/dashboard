import React, { useState } from 'react';

const Notification = ({ type, message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        isVisible && (
            <div className={`notification ${type}`}>
                <p>{message}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        )
    );
};

export default Notification;
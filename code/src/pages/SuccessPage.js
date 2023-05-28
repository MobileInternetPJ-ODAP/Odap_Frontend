import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const userData = location.state.userData;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Welcome, {userData.username}!</h2>
        </div>
    );
};

export default SuccessPage;

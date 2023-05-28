import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        // 登录成功后重定向到 /success 页面
        navigate('/success', { state: { userData } });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400 }}>
                <h2>Login</h2>
                <LoginForm onLogin={handleLogin} />
            </Card>
        </div>
    );
};

export default LoginPage;

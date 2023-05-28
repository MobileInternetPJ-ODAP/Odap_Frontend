import React from 'react';
import { Card, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleLogin = (userData) => {
        navigate('/success', { state: { userData } });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400 }}>
                <h2>Login</h2>
                <LoginForm onLogin={handleLogin} showModal={showModal} />
            </Card>
            <Modal title="Register" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <RegisterForm />
            </Modal>

        </div>
    );
};

export default LoginPage;

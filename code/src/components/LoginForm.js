import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function Login({ showModal }) {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = values => {
        axios.post('http://localhost:8080/api/user/login', values)
            .then(response => {
                const { code, error_msg } = response.data;
                if (code === 200) {
                    navigate('/success', { state: { userData: values } });
                } else {
                    message.error(error_msg);
                }
            })
            .catch(err => {
                console.log(err);
                message.error('Login Failed');
            });
    };

    return (
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                <span style={{ marginLeft: 80 }} />
                <Button type="link" onClick={showModal}>
                    Don't have an account? Register Now!
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;

import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFilePage = () => {
    const onFinish = async (values) => {
        const { file, desc, sample_type, data_type } = values;

        const formData = new FormData();
        formData.append('file', file[0]);
        formData.append('desc', desc);
        formData.append('sample_type', sample_type);
        formData.append('data_type', data_type);

        try {
            const response = await fetch('http://localhost:8080/api/dataset', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                // 请求成功，处理返回的数据
                console.log(data);
            } else {
                // 请求失败，处理错误信息
                message.error(data.error_msg);
            }
        } catch (error) {
            // 发生错误，处理异常
            console.error(error);
            message.error('An error occurred. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>上传文件</h2>
            <Form
                name="uploadForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="文件"
                    name="file"
                    rules={[{ required: true, message: '请选择要上传的文件' }]}
                >
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />} type="primary">选择文件</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入文件描述' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="样本类型"
                    name="sample_type"
                    rules={[{ required: true, message: '请输入样本类型' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="标记类型"
                    name="data_type"
                    rules={[{ required: true, message: '请输入标记类型' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Button type="primary" htmlType="submit">上传</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadFilePage;
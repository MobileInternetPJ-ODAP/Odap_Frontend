import React, { useState } from 'react';
import { Form, Input, Button, Upload, Card } from 'antd';

function FileUploadForm() {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    const handleFileChange = (info) => {
        setFile(info.file.originFileObj);
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tag_type', values.tagType);
            formData.append('sample_type', values.sampleType);
            formData.append('desc', values.desc);

            fetch('http://localhost:8080/api/dataset', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    // 处理响应数据
                    console.log(data);
                })
                .catch((error) => {
                    // 处理错误
                    console.error(error);
                });
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400 }}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item label="文件" name="file">
                        <Upload onChange={handleFileChange}>
                            <Button>Select File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="标签类型" name="tagType">
                        <Input />
                    </Form.Item>
                    <Form.Item label="样本类型" name="sampleType">
                        <Input />
                    </Form.Item>
                    <Form.Item label="描述" name="desc">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            上传
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default FileUploadForm;

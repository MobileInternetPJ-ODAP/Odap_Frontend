import React, { useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    FolderOutlined,
    TagOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import cookie from 'react-cookies'
const { Sider, Content } = Layout;





const SuccessPage = () => {
  const navigate = useNavigate();
  const userData = null;


  useEffect(() => {
    // 检查cookie是否存在，如果不存在则跳转到/login
    if (cookie.load('user') === undefined) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const handleLogout = () => {
    // 执行注销操作，清除cookie等
    // 这里只是示例，实际操作根据你的需求来实现
    cookie.remove('user');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/success">{cookie.load('user')}</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UploadOutlined />}>
                    <Link to="/upload">上传文件</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FolderOutlined />}>
                    <Link to="/manage">管理文件</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<TagOutlined />}>
                    <Link to="/annotate">标注数据</Link>
                </Menu.Item>
            </Menu>
            <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)' }}
            >
                Logout
            </Button>
        </Sider>
        <Layout>
            <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <h2>Welcome, {cookie.load('user')}!</h2>
                </div>
            </Content>
        </Layout>
    </Layout>
);
};

export default SuccessPage;

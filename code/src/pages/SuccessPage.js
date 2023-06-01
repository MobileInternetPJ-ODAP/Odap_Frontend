import React, { useEffect } from 'react';
import { Layout} from 'antd';

import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import MenuComponent from '../components/MenuList';


const { Content } = Layout;







const SuccessPage = () => {
    const navigate = useNavigate();
    const userData = null;
  
  
    useEffect(() => {
      // 检查cookie是否存在，如果不存在则跳转到/login
      if (cookie.load('user') === undefined) {
        navigate('/login');
      }
    }, [userData, navigate]);
  
  
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <MenuComponent />
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

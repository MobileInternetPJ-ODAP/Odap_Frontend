import React, { useEffect, useState } from 'react';
import { Table, Pagination, Layout, Button, Space, message, Card } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import MenuComponent from '../components/MenuList';
import { useLocation, useNavigate } from 'react-router-dom';

const SamplePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const datasetId = searchParams.get('dataset_id');

  const [datasets, setDatasets] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const handleNameClick = (record) => {
    const datasetId = record.datasetId;
    const sampleId = record.id;
    const sampleName = record.name;
    navigate(`/manage/sample/tag/?dataset_id=${datasetId}&sample_id=${sampleId}&sample_name=${sampleName}`);
  };

  const handleGoBack = () => {
    navigate('/manage');
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/samples', {
        params: {
          page_num: currentPage,
          page_size: pageSize,
          dataset_id: datasetId,
        },
      });

      if (response.data.code === 200) {
        const { data } = response.data;
        setDatasets(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/count_samples/', {
        params: {
          dataset_id: datasetId,
        },
      });
      if (response.data.code === 200) {
        const { data } = response.data;
        setTotal(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTotalCount();
    // eslint-disable-next-line
  }, []);

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    fetchData();
  };

  const handleDelete = async (id) => {
    // try {
    //   const response = await axios.delete(`http://localhost:8080/api/dataset/${id}`, {
    //     headers: {
    //       'Content-Type': undefined, // 或者删除该行
    //     },
    //   });
    //   const { code } = response.data;
    //   if (code === 200) {
    //     message.success('删除成功', 1, fetchData);
    //   } else {
    //     message.error('删除失败');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    message.error('您不是管理员', 1);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
          // eslint-disable-next-line
          <a onClick={() => handleNameClick(record)}>{text}</a>
      ),
    },

    {
      key: 'actions',
      width: 80,
      render: (text, record) => (
          <Space>
            <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
            />
          </Space>
      ),
    },
  ];

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <MenuComponent />
        <Layout>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button type="primary" onClick={handleGoBack} style={{ margin: '10px' }}>
            Go Back
          </Button>
          <h1 style={{ textAlign: 'center', flex: 1 }}>Sample List</h1>
        </div>
            <Card>
              <Table dataSource={datasets} columns={columns} pagination={false} />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                />
              </div>
            </Card>
          </div>
        </Layout>
      </Layout>
  );
};

export default SamplePage;

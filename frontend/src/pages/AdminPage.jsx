import { Card, Row, Col, Table, Space, Button, Input, Select, Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaUsers,
  FaStore,
  FaStar,
  FaUserPlus,
  FaStoreAlt,
  FaSearch,
} from 'react-icons/fa';
import AdminStats from '../components/Dashboard/AdminStats';
import RatingChart from '../components/Dashboard/RatingChart';
import { getAdminStats, getAllUsers, getAllStores, addStore } from '../redux/adminSlice';

const { Option } = Select;

const AdminPage = () => {
  const dispatch = useDispatch();
  const { stats, users, stores, loading } = useSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFilters, setUserFilters] = useState({});
  const [storeFilters, setStoreFilters] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === 'users') {
      dispatch(getAllUsers(userFilters));
    } else if (activeTab === 'stores') {
      dispatch(getAllStores(storeFilters));
    }
  }, [activeTab, userFilters, storeFilters, dispatch]);

  const handleAddStore = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(addStore(values))
          .unwrap()
          .then(() => {
            message.success('Store added successfully!');
            form.resetFields();
            setIsModalVisible(false);
          })
          .catch((error) => {
            message.error(error || 'Failed to add store');
          });
      })
      .catch((info) => {
        message.error('Please fill all required fields');
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'Rating',
      dataIndex: 'avgRating',
      key: 'avgRating',
      render: (value, record) => (record.role === 'STORE_OWNER' ? value : 'N/A'),
      sorter: (a, b) => (a.avgRating || 0) - (b.avgRating || 0),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>Delete</Button>
        </Space>
      ),
    },
  ];

const storeColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'name'],
      key: 'owner',
      sorter: (a, b) => a.owner.name.localeCompare(b.owner.name),
    },
  {
    title: 'Rating',
    dataIndex: 'avgRating',
    key: 'avgRating',
    sorter: (a, b) => a.avgRating - b.avgRating,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">View</Button>
        <Button type="link" danger>Delete</Button>
      </Space>
    ),
  },];
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Admin Dashboard"
            extra={
              <Space>
                <Button
                  type={activeTab === 'dashboard' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  type={activeTab === 'users' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('users')}
                  icon={<FaUsers />}
                >
                  Users
                </Button>
                <Button
                  type={activeTab === 'stores' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('stores')}
                  icon={<FaStore />}
                >
                  Stores
                </Button>
              </Space>
            }
          >
            {activeTab === 'dashboard' && (
              <>
                <AdminStats stats={stats} loading={loading} />
                <Card title="Rating Distribution" style={{ marginTop: '24px' }}>
                  <RatingChart ratings={stats?.ratingDistribution || []} />
                </Card>
              </>
            )}

            {activeTab === 'users' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <Space>
                    <Input
                      placeholder="Search by name"
                      prefix={<FaSearch />}
                      onChange={(e) => setUserFilters({ ...userFilters, name: e.target.value })}
                    />
                    <Input
                      placeholder="Search by email"
                      prefix={<FaSearch />}
                      onChange={(e) => setUserFilters({ ...userFilters, email: e.target.value })}
                    />
                    <Select
                      placeholder="Filter by role"
                      style={{ width: 180 }}
                      onChange={(value) => setUserFilters({ ...userFilters, role: value })}
                      allowClear
                    >
                      <Option value="USER">Normal User</Option>
                      <Option value="STORE_OWNER">Store Owner</Option>
                      <Option value="ADMIN">Admin</Option>
                    </Select>
                    <Button type="primary" icon={<FaUserPlus />}>
                      Add User
                    </Button>
                  </Space>
                </div>
                <Table
                  columns={userColumns}
                  dataSource={users}
                  loading={loading}
                  rowKey="id"
                />
              </>
            )}

            {activeTab === 'stores' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <Space>
                    <Input
                      placeholder="Search by name"
                      prefix={<FaSearch />}
                      onChange={(e) => setStoreFilters({ ...storeFilters, name: e.target.value })}
                    />
                    <Input
                      placeholder="Search by address"
                      prefix={<FaSearch />}
                      onChange={(e) => setStoreFilters({ ...storeFilters, address: e.target.value })}
                    />
                    <Button type="primary" icon={<FaStoreAlt />} onClick={handleAddStore}>
                      Add Store
                    </Button>
                  </Space>
                </div>
                <Table
                  columns={storeColumns}
                  dataSource={stores}
                  loading={loading}
                  rowKey="id"
                />
              </>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="Add New Store"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Store Name"
            rules={[
              { required: true, message: 'Please input the store name!' },
              { min: 20, message: 'Name must be at least 20 characters!' },
              { max: 60, message: 'Name must be at most 60 characters!' },
            ]}
          >
            <Input placeholder="Enter store name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Store Email"
            rules={[
              { required: true, message: 'Please input the store email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input placeholder="Enter store email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Store Address"
            rules={[
              { required: true, message: 'Please input the store address!' },
              { max: 400, message: 'Address must be at most 400 characters!' },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Enter store address" maxLength={400} showCount />
          </Form.Item>
          <Form.Item
            name="ownerId"
            label="Store Owner"
            rules={[{ required: true, message: 'Please select a store owner!' }]}
          >
            <Select placeholder="Select store owner">
              {users
                .filter((user) => user.role === 'STORE_OWNER')
                .map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPage;

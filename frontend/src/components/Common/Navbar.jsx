import { Layout, Dropdown, Avatar, Button, Space, Badge, message } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Header } = Layout;

const Navbar = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    message.success('Logged out successfully');
    navigate('/login');
  };

  const items = [
    {
      key: '1',
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: <Link to="/profile/settings">Settings</Link>,
      icon: <SettingOutlined />
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  return (
    <Header 
      style={{ 
        padding: 0, 
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}
    >
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Store Rating System
        </span>
      </div>
      
      <Space size="large" style={{ marginRight: 24 }}>
        <Badge count={notificationsCount}>
          <Button 
            type="text" 
            icon={<BellOutlined style={{ fontSize: '16px' }} />}
            onClick={() => navigate('/notifications')}
          />
        </Badge>
        
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: 'pointer', padding: '0 16px' }}>
            <Avatar 
              size="default" 
              icon={<UserOutlined />} 
              src={user?.avatar}
              style={{ backgroundColor: '#1890ff' }}
            />
            <span style={{ fontWeight: 500 }}>
              {user?.name || 'User'}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navbar;
import { Layout, Menu, Drawer, theme } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  TeamOutlined,
  StarOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label: children ? label : <Link to={key}>{label}</Link>,
  };
};

const Sidebar = ({ collapsed, isMobile, drawerVisible, setDrawerVisible }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let menuItems = [];

  if (user?.role === 'ADMIN') {
    menuItems = [
      getItem('Dashboard', '/admin', <DashboardOutlined />),
      getItem('Stores', '/stores', <ShopOutlined />),
      getItem('Users', '/users', <TeamOutlined />),
      getItem('Ratings', '/ratings', <StarOutlined />),
      getItem('Reports', '/reports', <FileTextOutlined />),
    ];
  } else if (user?.role === 'STORE_OWNER') {
    menuItems = [
      getItem('Dashboard', '/owner', <DashboardOutlined />),
      getItem('Ratings', '/ratings', <StarOutlined />),
    ];
  } else {
    menuItems = [
      getItem('Stores', '/stores', <ShopOutlined />),
      getItem('My Ratings', '/my-ratings', <StarOutlined />),
    ];
  }

  menuItems.push(
    getItem('Settings', 'sub-settings', <SettingOutlined />, [
      getItem('Profile', '/profile'),
    ])
  );

  const menu = (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={['sub-settings']}
      items={menuItems}
      style={{ borderRight: 0 }}
      onClick={() => isMobile && setDrawerVisible(false)}
    />
  );

  if (isMobile) {
    return (
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        {menu}
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: colorBgContainer,
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colorBgContainer,
        }}
      >
        <Link to="/" style={{ fontWeight: 'bold', fontSize: 18, color: '#1890ff' }}>
          {collapsed ? 'SR' : 'Store Ratings'}
        </Link>
      </div>
      {menu}
    </Sider>
  );
};

export default Sidebar;
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState, useEffect } from 'react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  if (!user) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />

      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 200,
          transition: 'margin-left 0.2s',
          minHeight: '100vh'
        }}
      >
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          setDrawerVisible={setDrawerVisible}
        />

        <Content
          style={{
            margin: isMobile ? '16px' : '24px',
            marginTop: 64,
            overflow: 'initial'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Typography, Button, Space } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={1} style={{ color: '#1890ff', marginBottom: 24 }}>
          Welcome to Store Ratings
        </Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: 40 }}>
          {token ? `Hello, ${user.name}!` : 'Please login or register to rate stores.'}
        </Paragraph>

        <Space size="middle">
          {!token ? (
            <>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
              <Link to="/login">
                <Button type="default">Login</Button>
              </Link>
            </>
          ) : (
            <Link to="/stores">
              <Button type="primary">Browse Stores</Button>
            </Link>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default HomePage;

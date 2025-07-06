import { Layout, Card, Typography, Avatar, Space, Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  return (
    <Content style={{ marginLeft: '224px', padding: '24px', minHeight: 'calc(100vh - 84px)' }}>
      <Card
        title={
          <Space>
            <Avatar size={64} icon={<UserOutlined />} src={user?.avatar} />
            <Title level={4} style={{ margin: 0 }}>My Profile</Title>
          </Space>
        }
        style={{ width: '100%', maxWidth: '800px', margin: '1 auto', marginTop: 40, padding: '14px', }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user?.name,
            email: user?.email,
            address: user?.address
          }}
        >
          <Form.Item label="Full Name" name="name">
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          
          <Form.Item label="Email" name="email">
            <Input prefix={<MailOutlined />} disabled />
          </Form.Item>
          
          <Form.Item label="Address" name="address">
            <Input.TextArea prefix={<HomeOutlined />} rows={3} />
          </Form.Item>
          
          <Button type="primary">Update Profile</Button>
        </Form>
      </Card>
    </Content>
  );
};

export default ProfilePage;

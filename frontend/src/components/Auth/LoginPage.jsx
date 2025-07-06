import { Button, Card, Form, Input, message, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/authSlice';
import { useEffect } from 'react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, status, error } = useSelector((state) => state.auth);
  const screens = useBreakpoint();
  const loading = status === 'loading';

  const onFinish = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }

    if (user && token) {
      message.success('Login successful!');
      navigate('/');
    }
  }, [error, user, token, dispatch, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5',
      padding: '16px'
    }}>
      <Card 
        title="Login to Your Account" 
        style={{ 
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        headStyle={{ 
          textAlign: 'center',
          fontSize: screens.xs ? '18px' : '20px',
          fontWeight: 'bold',
          padding: screens.xs ? '12px' : '24px'
        }}
        bodyStyle={{
          padding: screens.xs ? '16px' : '24px'
        }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input 
              placeholder="Enter your email address" 
              size={screens.xs ? 'middle' : 'large'} 
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password 
              placeholder="Enter your password" 
              size={screens.xs ? 'middle' : 'large'} 
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox name="remember">Remember me</Checkbox>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size={screens.xs ? 'middle' : 'large'}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            Don't have an account? <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

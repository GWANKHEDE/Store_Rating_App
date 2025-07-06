import { Button, Card, Form, Input, message, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/authSlice';
import { useEffect } from 'react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Option } = Select;

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, status, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const loading = status === 'loading';

  const onFinish = (values) => {
    dispatch(register(values));
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }

    if (user && token) {
      message.success('Registration successful!');
      navigate('/');
    }
  }, [error, user, token, dispatch, navigate]);

  const validatePassword = (_, value) => {
    if (!value) return Promise.reject('Please input your password!');
    if (value.length < 8 || value.length > 16) {
      return Promise.reject('Password must be 8-16 characters!');
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject('Password must contain at least one uppercase letter!');
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return Promise.reject('Password must contain at least one special character!');
    }
    return Promise.resolve();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '10vh',
      background: '#f0f2f5',
      padding: '16px'
    }}>
      <Card 
        title="Create New Account" 
        style={{ 
          width: '100%',
          maxWidth: '500px',
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
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { min: 20, message: 'Name must be at least 20 characters!' },
              { max: 60, message: 'Name must be at most 60 characters!' }
            ]}
          >
            <Input 
              size={screens.xs ? 'middle' : 'large'} 
              placeholder="Enter your full name (20-60 characters)" 
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input 
              size={screens.xs ? 'middle' : 'large'} 
              placeholder="Enter your email address" 
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please input your address!' },
              { max: 400, message: 'Address must be at most 400 characters!' }
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Enter your full address" 
              maxLength={400}
              showCount
              size={screens.xs ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true },
              { validator: validatePassword }
            ]}
          >
            <Input.Password 
              size={screens.xs ? 'middle' : 'large'}
              placeholder="Enter password (8-16 chars with uppercase and special char)" 
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              size={screens.xs ? 'middle' : 'large'}
              placeholder="Confirm your password" 
            />
          </Form.Item>

          <Form.Item
            label="Register As"
            name="role"
            initialValue="USER"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Select size={screens.xs ? 'middle' : 'large'}>
              <Option value="USER">Normal User</Option>
              <Option value="STORE_OWNER">Store Owner</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size={screens.xs ? 'middle' : 'large'}
            >
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;

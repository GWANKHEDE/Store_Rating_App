import { Card, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/slices/userSlice';

const PasswordPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

  const onFinish = async (values) => {
    try {
      await dispatch(updatePassword(values)).unwrap();
      message.success('Password updated successfully!');
    } catch (error) {
      message.error(error.message || 'Password update failed');
    }
  };

  return (
    <Card title="Change Password">
      <Form onFinish={onFinish}>
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Current Password" 
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password!' },
            { min: 8, message: 'Password must be at least 8 characters' },
            { max: 16, message: 'Password cannot exceed 16 characters' },
            { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter' },
            { pattern: /[!@#$%^&*]/, message: 'Must contain at least one special character' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="New Password" 
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm New Password" 
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordPage;

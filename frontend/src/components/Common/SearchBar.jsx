import { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name: searchTerm });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space.Compact style={{ padding: '1px', margin: '-10px' , width: '100%' }}>
        <Input
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
        <Button
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </Space.Compact>
    </form>
  );
};

export default SearchBar;

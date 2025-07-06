import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../redux/storeSlice';
import StoreList from '../components/Stores/StoreList';
import SearchBar from '../components/Common/SearchBar';
import { Typography, Row, Col, Card } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Title } = Typography;

const StoresPage = () => {
  const dispatch = useDispatch();
  const { stores, status } = useSelector((state) => state.stores);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    dispatch(getStores({}));
  }, [dispatch]);

  const handleSearch = (filters) => {
    dispatch(getStores(filters));
  };

  const contentStyle = {
    padding: isMobile ? '16px' : '24px',
    marginLeft: isMobile ? 0 : collapsed ? 250 : 300, 
    marginTop: 60, 
    transition: 'all 0.2s',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#f5f7fa',
    position: 'relative',
    overflow: 'auto',
  };

  return (
    <div style={contentStyle}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: '#333',
              marginBottom: 0,
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            All Registered Stores
          </Title>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              backgroundColor: '#fff',
            }}
          >
            <SearchBar onSearch={handleSearch} />
          </Card>
        </Col>

        <Col span={24}>
          <StoreList
            stores={stores}
            loading={status === 'loading'}
            isMobile={isMobile}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StoresPage;


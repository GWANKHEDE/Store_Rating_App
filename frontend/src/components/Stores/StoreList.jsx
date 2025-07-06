import { Row, Col, Card, Spin, Empty, Typography, Rate, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RatingForm from '../Stores/RatingForm';
import { rateStore } from '../../redux/storeSlice';

const { Paragraph } = Typography;

const StoreList = ({ stores, loading }) => {
  const {
    token: { colorTextSecondary, colorPrimary, boxShadowSecondary },
  } = theme.useToken();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleRatingSubmit = (storeId, rating) => {
    dispatch(rateStore({ storeId, rating }))
      .unwrap()
      .then(() => {
        
      })
      .catch((error) => {
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 12 }}>Loading stores...</p>
      </div>
    );
  }

  if (!stores.length) {
    return <Empty description="No stores found" style={{ marginTop: 48 }} />;
  }

  return (
    <Row gutter={[16, 16]}>
      {stores.map((store) => (
        <Col key={store.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            title={store.name}
            bordered={false}
            hoverable
            style={{
              height: '100%',
              borderRadius: 8,
              boxShadow: boxShadowSecondary,
            }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 12 }}>
              {store.address}
            </Paragraph>

            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
              <Rate disabled allowHalf value={store.avgRating} />
              <span style={{ marginLeft: 8, color: colorTextSecondary }}>
                {store.avgRating} ({store.totalRatings} ratings)
              </span>
            </div>

            {user?.role === 'USER' && (
              <div style={{ marginBottom: 16 }}>
                <Paragraph style={{ marginBottom: 8 }}>
                  Your Rating:{' '}
                  {store.userRating ? (
                    <Rate disabled allowHalf value={store.userRating} />
                  ) : (
                    'Not rated'
                  )}
                </Paragraph>
                <RatingForm
                  currentRating={store.userRating || 0}
                  onSubmit={(rating) => handleRatingSubmit(store.id, rating)}
                />
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StoreList;

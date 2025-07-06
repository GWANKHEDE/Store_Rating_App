import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreOwnerStats } from '../../redux/storeSlice';
import RatingChart from '../../components/Dashboard/RatingChart';
import { Card, Table, Tag } from 'antd';

const StoreOwnerDashboard = () => {
  const dispatch = useDispatch();
  const { stats, status } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStoreOwnerStats());
  }, [dispatch]);

  const columns = [
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Rating',
      dataIndex: 'value',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Store Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Store Information" loading={status === 'loading'}>
          {stats?.store && (
            <>
              <p className="mb-2"><strong>Name:</strong> {stats.store.name}</p>
              <p className="mb-2"><strong>Address:</strong> {stats.store.address}</p>
              <p className="mb-2">
                <strong>Status:</strong> 
                <Tag color="green" className="ml-2">Active</Tag>
              </p>
              <p className="mb-2">
                <strong>Average Rating:</strong> {stats.store.avgRating?.toFixed(1) || 'N/A'}
              </p>
              <p><strong>Total Ratings:</strong> {stats.store.totalRatings || 0}</p>
            </>
          )}
        </Card>

        <Card title="Rating Distribution" loading={status === 'loading'}>
          <RatingChart ratings={stats?.ratings || []} />
        </Card>
      </div>

      <Card title="Recent Ratings" loading={status === 'loading'}>
        <Table 
          columns={columns} 
          dataSource={stats?.ratings || []} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default StoreOwnerDashboard;

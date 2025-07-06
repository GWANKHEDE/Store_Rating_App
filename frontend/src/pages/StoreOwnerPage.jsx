import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreOwnerStats } from '../redux/storeSlice';
import RatingChart from '../components/Dashboard/RatingChart';

const StoreOwnerPage = () => {
  const dispatch = useDispatch();
  const { stats, status } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStoreOwnerStats());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-12">No store data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Store Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Store Information</h2>
          <p className="mb-2"><strong>Name:</strong> {stats.store.name}</p>
          <p className="mb-2"><strong>Address:</strong> {stats.store.address}</p>
          <p className="mb-2"><strong>Total Ratings:</strong> {stats.store.totalRatings}</p>
          <p><strong>Average Rating:</strong> {stats.store.avgRating.toFixed(1)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
          <RatingChart ratings={stats.ratings} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Ratings</h2>
        {stats.ratings.length ? (
          <div className="space-y-4">
            {stats.ratings.slice(0, 5).map((rating) => (
              <div key={rating.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{rating.user.name}</h3>
                  <RatingStars rating={rating.value} />
                </div>
                <p className="text-sm text-gray-500">
                  Rated on {new Date(rating.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No ratings yet</p>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerPage;

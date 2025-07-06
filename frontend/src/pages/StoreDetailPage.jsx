import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreDetails, rateStore } from '../redux/storeSlice';
import RatingStars from '../components/Common/RatingStars';
import RatingForm from '../components/Stores/RatingForm';

const StoreDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentStore, status } = useSelector((state) => state.stores);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getStoreDetails(id));
  }, [dispatch, id]);

  const handleRatingSubmit = (rating) => {
    dispatch(rateStore({ storeId: id, rating }));
  };

  if (status === 'loading' || !currentStore) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">Loading store details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{currentStore.name}</h1>
              <p className="text-gray-600">{currentStore.address}</p>
            </div>
            <div className="flex items-center">
              <RatingStars rating={currentStore.avgRating} size="lg" />
              <span className="ml-2 text-xl font-semibold">
                {currentStore.avgRating.toFixed(1)}
              </span>
            </div>
          </div>

          {user?.role === 'USER' && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Rate this store</h2>
              <RatingForm 
                currentRating={currentStore.userRating}
                onSubmit={handleRatingSubmit}
              />
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
            {currentStore.ratings?.length ? (
              <div className="space-y-4">
                {currentStore.ratings.map((rating) => (
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
      </div>
    </div>
  );
};

export default StoreDetailPage;

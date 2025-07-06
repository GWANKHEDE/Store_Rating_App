import { FaUsers, FaStore, FaStar } from 'react-icons/fa';

const AdminStats = ({ stats, loading }) => {
  if (loading) return <div>Loading stats...</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard icon={<FaUsers />} title="Total Users" value={stats.totalUsers} />
      <StatCard icon={<FaStore />} title="Total Stores" value={stats.totalStores} />
      <StatCard icon={<FaStar />} title="Total Ratings" value={stats.totalRatings} />
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminStats;


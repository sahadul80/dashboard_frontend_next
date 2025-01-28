import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    productCount: 0,
    sales: 0,
  });
  const [searchResults, setSearchResults] = useState({
    users: [],
    products: [],
    categories: [],
    queries: [],
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/search?keyword=${searchKeyword}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error during search', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Users</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.userCount}</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Products</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.productCount}</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Sales</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.sales}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search users, products, categories, or queries..."
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-8">
        {/* Users */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
          <ul className="space-y-4">
            {searchResults.users?.map((user: any) => (
              <li key={user.id} className="bg-base-200 p-4 rounded-md shadow-md">
                <p className="font-semibold text-gray-800">ID: {user.id}</p>
                <p className="text-gray-700">Name: {user.name}</p>
                <p className="text-gray-700">Email: {user.email}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Products</h2>
          <ul className="space-y-4">
            {searchResults.products?.map((product: any) => (
              <li key={product.id} className="bg-base-200 p-4 rounded-md shadow-md">
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-700">{product.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
          <ul className="space-y-4">
            {searchResults.categories?.map((category: any) => (
              <li key={category.id} className="bg-base-200 p-4 rounded-md shadow-md">
                <p className="font-semibold text-gray-800">{category.name}</p>
                <p className="text-gray-700">{category.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Queries */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Queries</h2>
          <ul className="space-y-4">
            {searchResults.queries?.map((query: any) => (
              <li key={query.id} className="bg-base-200 p-4 rounded-md shadow-md">
                <p className="font-semibold text-gray-800">{query.subject}</p>
                <p className="text-gray-700">{query.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

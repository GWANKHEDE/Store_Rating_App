import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

import ProtectedRoute from './components/Common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import StoresPage from './pages/StoresPage';
import StoreDetailPage from './pages/StoreDetailPage';
import AdminPage from './pages/AdminPage';
import StoreOwnerPage from './pages/StoreOwnerPage';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';
import ProfilePage from './components/Common/ProfilePage';

import { Layout } from 'antd';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {token && <Sidebar />}
        
        <Layout>
          {token && <Navbar />}

          <div style={{ backgroundColor: token ? '#f0f2f5' : '#fff', padding: token ? '20px' : '0' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/stores/:id" element={<StoreDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} /> 

              <Route element={<ProtectedRoute roles={['ADMIN']} />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              <Route element={<ProtectedRoute roles={['STORE_OWNER']} />}>
                <Route path="/owner" element={<StoreOwnerPage />} />
              </Route>
            </Routes>

            <ToastContainer position="bottom-right" />
          </div>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

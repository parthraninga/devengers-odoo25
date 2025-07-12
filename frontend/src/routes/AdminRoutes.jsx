
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../contexts/AdminAuthContext';
import ProtectedAdminRoute from '../components/admin/ProtectedAdminRoute';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminListings from '../pages/admin/AdminListings';
import AdminSwaps from '../pages/admin/AdminSwaps';
import AdminActivity from '../pages/admin/AdminActivity';
import AdminReports from '../pages/admin/AdminReports';

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex">
    <AdminSidebar />
    <div className="flex-1 lg:ml-0">
      {children}
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/*" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/listings" element={<AdminListings />} />
                <Route path="/swaps" element={<AdminSwaps />} />
                <Route path="/activity" element={<AdminActivity />} />
                <Route path="/reports" element={<AdminReports />} />
                <Route path="/" element={<AdminDashboard />} />
              </Routes>
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminRoutes;

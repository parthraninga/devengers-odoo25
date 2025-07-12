
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    
    setLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock admin login - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@rewear.com' && password === 'admin123') {
        const mockAdmin = {
          id: 1,
          name: 'Admin Pushkar',
          email: email,
          role: 'super_admin',
          avatar: null,
          permissions: ['manage_users', 'manage_listings', 'manage_swaps', 'view_analytics']
        };
        
        const mockToken = 'admin-jwt-token-' + Date.now();
        
        localStorage.setItem('adminToken', mockToken);
        localStorage.setItem('adminData', JSON.stringify(mockAdmin));
        
        setAdmin(mockAdmin);
        toast.success('Admin login successful!');
        return { success: true };
      } else {
        toast.error('Invalid admin credentials');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Admin login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    toast.success('Admin logged out successfully');
  };

  const value = {
    admin,
    loginAdmin,
    logoutAdmin,
    loading
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

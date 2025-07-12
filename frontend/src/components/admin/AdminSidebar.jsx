
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ArrowLeftRight, 
  Activity, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut,
  Crown
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, logoutAdmin } = useAdminAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Manage Listings', path: '/admin/listings', icon: Package },
    { name: 'Manage Swaps', path: '/admin/swaps', icon: ArrowLeftRight },
    { name: 'Real-Time Activity', path: '/admin/activity', icon: Activity },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-r border-white/10">
      {/* Header */}
      <div className={`p-6 border-b border-white/10 ${collapsed ? 'px-4' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Crown className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">ReWear Admin</h1>
              <p className="text-xs text-gray-300">Control Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Profile */}
      <div className={`p-4 border-b border-white/10 ${collapsed ? 'px-2' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {admin?.name?.charAt(0) || 'A'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{admin?.name}</p>
              <p className="text-xs text-gray-300 truncate">{admin?.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <item.icon className={`w-5 h-5 ${collapsed ? '' : 'flex-shrink-0'}`} />
            {!collapsed && (
              <span className="font-medium">{item.name}</span>
            )}
            {isActive(item.path) && !collapsed && (
              <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logoutAdmin}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 w-full ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64">
          <SidebarContent />
        </div>
      </div>

      {/* Toggle Buttons */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex fixed top-4 left-4 z-40 p-2 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-gray-800 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-gray-800 transition-colors"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </>
  );
};

export default AdminSidebar;

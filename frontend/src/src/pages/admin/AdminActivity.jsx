
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Package, ArrowLeftRight, AlertTriangle, Zap } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminActivity = () => {
  const [activities, setActivities] = useState([]);

  const mockActivities = [
    {
      id: 1,
      type: 'user_join',
      message: 'New user Sarah Johnson joined the platform',
      user: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      type: 'item_upload',
      message: 'New item "Vintage Leather Jacket" uploaded',
      user: 'Mike Chen',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      icon: Package,
      color: 'green'
    },
    {
      id: 3,
      type: 'swap_request',
      message: 'Swap request created for "Designer Handbag"',
      user: 'Emma Wilson',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      icon: ArrowLeftRight,
      color: 'purple'
    },
    {
      id: 4,
      type: 'item_approved',
      message: 'Item "Evening Dress" approved by admin',
      user: 'Admin',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      icon: Package,
      color: 'green'
    },
    {
      id: 5,
      type: 'report_submitted',
      message: 'Report submitted for suspicious activity',
      user: 'Alex Rodriguez',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: 'live_update',
        message: 'Real-time activity update',
        user: 'System',
        timestamp: new Date(),
        icon: Zap,
        color: 'yellow'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
      green: 'bg-green-500/10 text-green-600 border-green-200',
      purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
      red: 'bg-red-500/10 text-red-600 border-red-200',
      yellow: 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      <AdminHeader 
        title="Real-Time Activity" 
        subtitle="Monitor live platform activity and user interactions"
      />

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: 'Active Now', value: '42', icon: Activity, color: 'green' },
          { label: 'Today\'s Signups', value: '18', icon: Users, color: 'blue' },
          { label: 'Items Uploaded', value: '35', icon: Package, color: 'purple' },
          { label: 'Swaps Completed', value: '12', icon: ArrowLeftRight, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Activity Feed</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100/50 dark:border-gray-700/50 last:border-b-0"
            >
              <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {activity.user}</p>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatTimestamp(activity.timestamp)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Updates automatically refresh every 30 seconds
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminActivity;

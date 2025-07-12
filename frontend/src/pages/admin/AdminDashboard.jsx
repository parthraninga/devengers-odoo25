
import { motion } from 'framer-motion';
import AdminHeader from '../../components/admin/AdminHeader';
import SummaryCards from '../../components/admin/SummaryCards';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  const swapTrendsData = [
    { name: 'Mon', swaps: 45, items: 23 },
    { name: 'Tue', swaps: 52, items: 31 },
    { name: 'Wed', swaps: 38, items: 28 },
    { name: 'Thu', swaps: 61, items: 42 },
    { name: 'Fri', swaps: 73, items: 55 },
    { name: 'Sat', swaps: 89, items: 67 },
    { name: 'Sun', swaps: 56, items: 34 },
  ];

  const categoryData = [
    { name: 'Clothing', value: 45, color: '#8B5CF6' },
    { name: 'Accessories', value: 25, color: '#EC4899' },
    { name: 'Shoes', value: 20, color: '#06B6D4' },
    { name: 'Others', value: 10, color: '#F59E0B' },
  ];

  const recentActivity = [
    { id: 1, action: 'New user registration', user: 'Sarah Johnson', time: '2 min ago', type: 'user' },
    { id: 2, action: 'Item approved', item: 'Vintage Leather Jacket', time: '5 min ago', type: 'approval' },
    { id: 3, action: 'Swap completed', users: 'Mike → Emma', time: '8 min ago', type: 'swap' },
    { id: 4, action: 'Report submitted', item: 'Designer Handbag', time: '12 min ago', type: 'report' },
    { id: 5, action: 'New listing created', user: 'Alex Chen', time: '15 min ago', type: 'listing' },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      user: '👤',
      approval: '✅',
      swap: '🔄',
      report: '⚠️',
      listing: '📦'
    };
    return icons[type] || '📋';
  };

  const getActivityColor = (type) => {
    const colors = {
      user: 'bg-blue-500/10 text-blue-600',
      approval: 'bg-green-500/10 text-green-600',
      swap: 'bg-purple-500/10 text-purple-600',
      report: 'bg-red-500/10 text-red-600',
      listing: 'bg-orange-500/10 text-orange-600'
    };
    return colors[type] || 'bg-gray-500/10 text-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      <AdminHeader 
        title="Dashboard Overview" 
        subtitle="Monitor your platform's performance and activity"
      />

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Swap Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Swap Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={swapTrendsData}>
              <defs>
                <linearGradient id="swapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '12px',
                  color: '#F9FAFB'
                }} 
              />
              <Area
                type="monotone"
                dataKey="swaps"
                stroke="#8B5CF6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#swapGradient)"
              />
              <Area
                type="monotone"
                dataKey="items"
                stroke="#EC4899"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#itemGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Items by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '12px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {activity.action}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {activity.user || activity.item || activity.users}
                </p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

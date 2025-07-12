
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminSwaps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const swaps = [
    {
      id: 1,
      itemOffered: {
        title: 'Vintage Levi\'s Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150',
        owner: 'Sarah Johnson'
      },
      itemRequested: {
        title: 'Designer Handbag',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150',
        owner: 'Emma Wilson'
      },
      status: 'pending',
      type: 'swap',
      createdAt: '2024-01-20',
      pointsValue: 85
    },
    {
      id: 2,
      itemOffered: {
        title: 'Nike Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150',
        owner: 'Mike Chen'
      },
      itemRequested: {
        title: 'Casual T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150',
        owner: 'Alex Rodriguez'
      },
      status: 'completed',
      type: 'swap',
      createdAt: '2024-01-18',
      pointsValue: 45
    },
    {
      id: 3,
      itemOffered: null,
      itemRequested: {
        title: 'Evening Dress',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150',
        owner: 'Lisa Park'
      },
      status: 'approved',
      type: 'redeem',
      createdAt: '2024-01-15',
      pointsValue: 120,
      requester: 'John Smith'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      approved: 'bg-blue-500/10 text-blue-600 border-blue-200',
      completed: 'bg-green-500/10 text-green-600 border-green-200',
      rejected: 'bg-red-500/10 text-red-600 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      approved: CheckCircle,
      completed: CheckCircle,
      rejected: XCircle
    };
    const Icon = icons[status] || Clock;
    return <Icon className="w-4 h-4" />;
  };

  const getTypeColor = (type) => {
    return type === 'swap' 
      ? 'bg-purple-500/10 text-purple-600 border-purple-200'
      : 'bg-orange-500/10 text-orange-600 border-orange-200';
  };

  const filteredSwaps = swaps.filter(swap => {
    const matchesSearch = 
      (swap.itemOffered?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (swap.itemRequested?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (swap.itemOffered?.owner.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (swap.itemRequested?.owner.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || swap.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <AdminHeader 
        title="Swap Management" 
        subtitle="Monitor and manage item swaps and redemptions"
      />

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search swaps by item or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Swaps List */}
      <div className="space-y-4">
        {filteredSwaps.map((swap, index) => (
          <motion.div
            key={swap.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getTypeColor(swap.type)}`}>
                  {swap.type === 'swap' ? '🔄 Swap' : '🎁 Redeem'}
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(swap.status)}`}>
                  {getStatusIcon(swap.status)}
                  <span className="capitalize">{swap.status}</span>
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(swap.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Swap Details */}
            <div className="flex items-center gap-6">
              {/* Left Item (Offered) */}
              {swap.type === 'swap' ? (
                <div className="flex-1">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <img
                      src={swap.itemOffered.image}
                      alt={swap.itemOffered.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{swap.itemOffered.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">by {swap.itemOffered.owner}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <div className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{swap.pointsValue}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">by {swap.requester}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Arrow */}
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Right Item (Requested) */}
              <div className="flex-1">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <img
                    src={swap.itemRequested.image}
                    alt={swap.itemRequested.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{swap.itemRequested.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {swap.itemRequested.owner}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Value: <span className="font-medium text-purple-600">{swap.pointsValue} points</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSwaps;

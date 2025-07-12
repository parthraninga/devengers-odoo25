
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, CheckCircle, XCircle, Package, Star, Calendar, Filter } from 'lucide-react';

const SwapHistory = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const swapHistory = [
    {
      id: 1,
      type: 'swap',
      status: 'completed',
      itemGiven: {
        title: 'Vintage Denim Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150',
        points: 85
      },
      itemReceived: {
        title: 'Designer Handbag',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150',
        points: 90
      },
      partner: 'Sarah Johnson',
      date: '2024-01-20',
      rating: 5
    },
    {
      id: 2,
      type: 'redeem',
      status: 'completed',
      itemGiven: null,
      itemReceived: {
        title: 'Summer Dress',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150',
        points: 65
      },
      partner: 'Emma Wilson',
      date: '2024-01-18',
      rating: 4
    },
    {
      id: 3,
      type: 'swap',
      status: 'pending',
      itemGiven: {
        title: 'Nike Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150',
        points: 120
      },
      itemReceived: {
        title: 'Leather Boots',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150',
        points: 115
      },
      partner: 'Mike Chen',
      date: '2024-01-15',
      rating: null
    },
    {
      id: 4,
      type: 'swap',
      status: 'rejected',
      itemGiven: {
        title: 'Casual T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150',
        points: 25
      },
      itemReceived: {
        title: 'Polo Shirt',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=150',
        points: 30
      },
      partner: 'Alex Rodriguez',
      date: '2024-01-12',
      rating: null
    }
  ];

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      pending: Clock,
      rejected: XCircle
    };
    return icons[status] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-500/10 text-green-600 border-green-200',
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      rejected: 'bg-red-500/10 text-red-600 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getTypeColor = (type) => {
    return type === 'swap' 
      ? 'bg-purple-500/10 text-purple-600 border-purple-200'
      : 'bg-orange-500/10 text-orange-600 border-orange-200';
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredHistory = swapHistory.filter(swap => {
    const matchesStatus = filterStatus === 'all' || swap.status === filterStatus;
    const matchesType = filterType === 'all' || swap.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Swap History
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Track your sustainable fashion journey and see all your successful swaps and redemptions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Swaps', value: '12', icon: Package, color: 'blue' },
            { label: 'Points Earned', value: '420', icon: Star, color: 'yellow' },
            { label: 'Items Saved', value: '18', icon: CheckCircle, color: 'green' },
            { label: 'Average Rating', value: '4.8', icon: Star, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-500/10 text-blue-600' :
                  stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-600' :
                  stat.color === 'green' ? 'bg-green-500/10 text-green-600' :
                  'bg-purple-500/10 text-purple-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="swap">Swaps</option>
                      <option value="redeem">Redemptions</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Swap History List */}
        <div className="space-y-6">
          {filteredHistory.map((swap, index) => {
            const StatusIcon = getStatusIcon(swap.status);
            
            return (
              <motion.div
                key={swap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getTypeColor(swap.type)}`}>
                          {swap.type === 'swap' ? '🔄 Swap' : '🎁 Redeem'}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(swap.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{swap.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(swap.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Swap Details */}
                    <div className="flex items-center gap-6">
                      {/* Left Item (Given) */}
                      {swap.type === 'swap' ? (
                        <div className="flex-1">
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
                            <img
                              src={swap.itemGiven.image}
                              alt={swap.itemGiven.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{swap.itemGiven.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Given</p>
                              <p className="text-sm font-medium text-purple-600">{swap.itemGiven.points} points</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{swap.itemReceived.points}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Points Used</div>
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

                      {/* Right Item (Received) */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                          <img
                            src={swap.itemReceived.image}
                            alt={swap.itemReceived.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{swap.itemReceived.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Received</p>
                            <p className="text-sm font-medium text-purple-600">{swap.itemReceived.points} points</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        with <span className="font-medium text-gray-900 dark:text-white">{swap.partner}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {swap.rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                            {renderStars(swap.rating)}
                          </div>
                        )}
                        {swap.status === 'completed' && !swap.rating && (
                          <Button variant="outline" size="sm">
                            Rate Experience
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SwapHistory;

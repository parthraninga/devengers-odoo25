
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Check, X, Eye, AlertTriangle, Package, Clock } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const listings = [
    {
      id: 1,
      title: 'Vintage Levi\'s Denim Jacket',
      owner: 'Sarah Johnson',
      category: 'Jackets',
      condition: 'Like New',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300',
      createdAt: '2024-01-20',
      price: 45,
      tags: ['vintage', 'denim', 'casual']
    },
    {
      id: 2,
      title: 'Designer Evening Dress',
      owner: 'Emma Wilson',
      category: 'Dresses',
      condition: 'Excellent',
      status: 'approved',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300',
      createdAt: '2024-01-18',
      price: 120,
      tags: ['designer', 'formal', 'evening']
    },
    {
      id: 3,
      title: 'Nike Air Max Sneakers',
      owner: 'Mike Chen',
      category: 'Shoes',
      condition: 'Good',
      status: 'rejected',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      createdAt: '2024-01-15',
      price: 80,
      tags: ['nike', 'sneakers', 'athletic']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      approved: 'bg-green-500/10 text-green-600 border-green-200',
      rejected: 'bg-red-500/10 text-red-600 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      approved: Check,
      rejected: X
    };
    const Icon = icons[status] || Clock;
    return <Icon className="w-4 h-4" />;
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    console.log('Approve listing:', id);
  };

  const handleReject = (id) => {
    console.log('Reject listing:', id);
  };

  return (
    <div className="p-6 space-y-6">
      <AdminHeader 
        title="Listing Management" 
        subtitle="Review and moderate item listings"
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
              placeholder="Search listings by title or owner..."
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
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getStatusColor(listing.status)}`}>
                {getStatusIcon(listing.status)}
                <span className="capitalize">{listing.status}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{listing.title}</h3>
                <div className="text-lg font-bold text-purple-600">${listing.price}</div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                by {listing.owner}
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{listing.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{listing.condition}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {listing.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              {listing.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm">Reject</span>
                  </button>
                </div>
              )}

              {(listing.status === 'approved' || listing.status === 'rejected') && (
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminListings;

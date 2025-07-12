
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, FileText, BarChart3, Users, Package } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    {
      id: 'overview',
      name: 'Platform Overview',
      description: 'Complete platform statistics and metrics',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'users',
      name: 'User Analytics',
      description: 'User registration, activity, and demographics',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'items',
      name: 'Item Reports',
      description: 'Listing statistics, categories, and trends',
      icon: Package,
      color: 'green'
    },
    {
      id: 'swaps',
      name: 'Swap Analytics',
      description: 'Exchange patterns and success rates',
      icon: FileText,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
      blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
      green: 'bg-green-500/10 text-green-600 border-green-200',
      orange: 'bg-orange-500/10 text-orange-600 border-orange-200'
    };
    return colors[color] || colors.purple;
  };

  const handleExport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format} for ${selectedPeriod}`);
  };

  return (
    <div className="p-6 space-y-6">
      <AdminHeader 
        title="Reports & Analytics" 
        subtitle="Generate and export platform reports"
      />

      {/* Report Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Period
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Report Type
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${
              selectedReport === report.id ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getColorClasses(report.color)}`}>
                <report.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>
                
                {/* Sample Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {report.id === 'overview' && (
                    <>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">2,847</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Users</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">1,234</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Swaps</div>
                      </div>
                    </>
                  )}
                  {report.id === 'users' && (
                    <>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">+24%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Growth</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">78%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                      </div>
                    </>
                  )}
                  {report.id === 'items' && (
                    <>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">5,423</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Items</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">156</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
                      </div>
                    </>
                  )}
                  {report.id === 'swaps' && (
                    <>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">89%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">$2.4K</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Value</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Options</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
          
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Excel</span>
          </button>
          
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminReports;

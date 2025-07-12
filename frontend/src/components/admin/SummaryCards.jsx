
import { Users, Package, ArrowLeftRight, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCards = () => {
  const cards = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-red-orange-400 to-red-orange-600',
      bgColor: 'bg-red-orange-500/10',
    },
    {
      title: 'Items Pending',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Package,
      color: 'from-red-orange-500 to-red-orange-700',
      bgColor: 'bg-red-orange-600/10',
    },
    {
      title: 'Swaps Completed',
      value: '1,234',
      change: '+24%',
      trend: 'up',
      icon: ArrowLeftRight,
      color: 'from-red-orange-300 to-red-orange-500',
      bgColor: 'bg-red-orange-400/10',
    },
    {
      title: 'Reports Generated',
      value: '43',
      change: '-5%',
      trend: 'down',
      icon: AlertCircle,
      color: 'from-red-orange-600 to-red-orange-800',
      bgColor: 'bg-red-orange-700/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-red-orange-500/10 card-hover transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              card.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{card.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;

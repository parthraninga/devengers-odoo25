
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus,
  TrendingUp,
  Heart,
  Package,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Gift,
  Users,
  Activity,
  ArrowUpRight,
  Calendar,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [pendingSwaps, setPendingSwaps] = useState([]);

  useEffect(() => {
    // Mock data
    setStats({
      totalItems: 12,
      activeSwaps: 3,
      completedSwaps: 8,
      totalLikes: 156,
      profileViews: 89,
      monthlyGrowth: 24
    });

    setRecentActivity([
      {
        id: 1,
        type: 'swap_completed',
        description: 'Swap completed with Sarah M.',
        time: '2 hours ago',
        icon: CheckCircle,
        color: 'text-green-500'
      },
      {
        id: 2,
        type: 'item_liked',
        description: 'Your "Vintage Dress" received 3 new likes',
        time: '4 hours ago',
        icon: Heart,
        color: 'text-red-500'
      },
      {
        id: 3,
        type: 'swap_request',
        description: 'New swap request from Mike R.',
        time: '1 day ago',
        icon: AlertCircle,
        color: 'text-blue-500'
      },
      {
        id: 4,
        type: 'item_added',
        description: 'Added "Designer Jacket" to your collection',
        time: '2 days ago',
        icon: Plus,
        color: 'text-purple-500'
      }
    ]);

    setMyItems([
      {
        id: 1,
        title: "Vintage Floral Dress",
        image: "/placeholder.svg",
        likes: 24,
        views: 156,
        status: "active"
      },
      {
        id: 2,
        title: "Designer Handbag",
        image: "/placeholder.svg",
        likes: 18,
        views: 89,
        status: "active"
      },
      {
        id: 3,
        title: "Leather Boots",
        image: "/placeholder.svg",
        likes: 31,
        views: 203,
        status: "swapped"
      }
    ]);

    setPendingSwaps([
      {
        id: 1,
        requester: { name: "Emma T.", avatar: "/placeholder.svg" },
        item: "Cozy Knit Sweater",
        offerItem: "Silk Scarf",
        time: "2 hours ago",
        status: "pending"
      },
      {
        id: 2,
        requester: { name: "Alex K.", avatar: "/placeholder.svg" },
        item: "High-Waisted Jeans",
        offerItem: "Vintage Belt",
        time: "1 day ago",
        status: "pending"
      }
    ]);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <Card className="glass border-white/20 card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-xs flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{change}% this month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-padding max-w-7xl mx-auto py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's what's happening with your swaps today.
              </p>
            </div>
            <Link to="/add-item">
              <Button className="gradient-primary text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="My Items"
            value={stats.totalItems}
            icon={Package}
            color="text-blue-500"
          />
          <StatCard
            title="Active Swaps"
            value={stats.activeSwaps}
            icon={Activity}
            color="text-purple-500"
          />
          <StatCard
            title="Completed Swaps"
            value={stats.completedSwaps}
            change={stats.monthlyGrowth}
            icon={CheckCircle}
            color="text-green-500"
          />
          <StatCard
            title="Total Likes"
            value={stats.totalLikes}
            icon={Heart}
            color="text-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`p-2 rounded-full bg-opacity-10 ${activity.color} bg-current`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/add-item">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
              <Link to="/browse">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Browse Items
                </Button>
              </Link>
              <Link to="/profile">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/swaps">
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  View All Swaps
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* My Items & Pending Swaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* My Items */}
          <Card className="glass border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  My Items
                </CardTitle>
                <Link to="/add-item">
                  <Button size="sm" variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-3 w-3" />
                          <span>{item.views} views</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Swaps */}
          <Card className="glass border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Pending Swaps
                </CardTitle>
                <Link to="/swaps">
                  <Button size="sm" variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSwaps.map((swap) => (
                  <div key={swap.id} className="p-4 border border-white/10 rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={swap.requester.avatar} />
                        <AvatarFallback>{swap.requester.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{swap.requester.name}</p>
                        <p className="text-xs text-muted-foreground">{swap.time}</p>
                      </div>
                      <Badge variant="outline">{swap.status}</Badge>
                    </div>
                    <div className="text-sm">
                      <p>Wants: <span className="font-medium">{swap.item}</span></p>
                      <p>Offers: <span className="font-medium">{swap.offerItem}</span></p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">Accept</Button>
                      <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

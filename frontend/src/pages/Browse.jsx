
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  Star,
  Grid3X3,
  List,
  Shuffle,
  SlidersHorizontal
} from 'lucide-react';

const Browse = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all', 'dresses', 'tops', 'pants', 'shoes', 'accessories', 'outerwear', 'activewear'
  ];

  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Mock data
  const mockItems = [
    {
      id: 1,
      title: "Vintage Floral Summer Dress",
      description: "Beautiful vintage-inspired dress perfect for summer occasions",
      category: "dresses",
      size: "M",
      condition: "Like New",
      images: ["/placeholder.svg"],
      owner: {
        name: "Sarah M.",
        avatar: "/placeholder.svg",
        rating: 4.8,
        location: "New York, NY"
      },
      tags: ["vintage", "floral", "summer"],
      createdAt: "2024-01-15",
      likes: 24
    },
    {
      id: 2,
      title: "Designer Leather Jacket",
      description: "Premium leather jacket from a luxury brand, barely worn",
      category: "outerwear",
      size: "L",
      condition: "Excellent",
      images: ["/placeholder.svg"],
      owner: {
        name: "Mike R.",
        avatar: "/placeholder.svg", 
        rating: 4.9,
        location: "Los Angeles, CA"
      },
      tags: ["leather", "designer", "jacket"],
      createdAt: "2024-01-14",
      likes: 31
    },
    {
      id: 3,
      title: "Cozy Knit Sweater",
      description: "Soft and warm sweater, perfect for cold weather",
      category: "tops",
      size: "S",
      condition: "Good",
      images: ["/placeholder.svg"],
      owner: {
        name: "Emma T.",
        avatar: "/placeholder.svg",
        rating: 4.7,
        location: "Seattle, WA"
      },
      tags: ["knit", "cozy", "winter"],
      createdAt: "2024-01-13",
      likes: 18
    },
    {
      id: 4,
      title: "High-Waisted Jeans",
      description: "Classic high-waisted jeans in excellent condition",
      category: "pants",
      size: "M",
      condition: "Like New",
      images: ["/placeholder.svg"],
      owner: {
        name: "Alex K.",
        avatar: "/placeholder.svg",
        rating: 4.6,
        location: "Chicago, IL"
      },
      tags: ["jeans", "high-waisted", "classic"],
      createdAt: "2024-01-12",
      likes: 27
    },
    {
      id: 5,
      title: "Statement Earrings",
      description: "Bold gold statement earrings, never worn",
      category: "accessories",
      size: "all",
      condition: "New",
      images: ["/placeholder.svg"],
      owner: {
        name: "Olivia S.",
        avatar: "/placeholder.svg",
        rating: 5.0,
        location: "Miami, FL"
      },
      tags: ["gold", "statement", "earrings"],
      createdAt: "2024-01-11",
      likes: 15
    },
    {
      id: 6,
      title: "Running Sneakers",
      description: "Comfortable running shoes in great condition",
      category: "shoes",
      size: "8",
      condition: "Good",
      images: ["/placeholder.svg"],
      owner: {
        name: "David L.",
        avatar: "/placeholder.svg",
        rating: 4.5,
        location: "Austin, TX"
      },
      tags: ["sneakers", "running", "comfortable"],
      createdAt: "2024-01-10",
      likes: 22
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size === selectedSize;
    
    return matchesSearch && matchesCategory && matchesSize;
  });

  const handleRequestSwap = (itemId) => {
    console.log('Requesting swap for item:', itemId);
    // In real app, this would open a swap request modal
  };

  const toggleLike = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, likes: item.likes + (item.isLiked ? -1 : 1), isLiked: !item.isLiked }
        : item
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container-padding max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-padding max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-gradient mb-4">
            Browse Items
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing pre-loved fashion items from our community
          </p>
        </div>

        {/* Filters */}
        <Card className="glass border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Size Filter */}
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredItems.map((item) => (
            <Card key={item.id} className="glass border-white/20 card-hover group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 glass hover:bg-red-500 hover:text-white"
                  onClick={() => toggleLike(item.id)}
                >
                  <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Badge className="absolute top-3 left-3 glass border-white/20">
                  {item.condition}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Size {item.size}</Badge>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{item.likes}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.owner.avatar} />
                    <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.owner.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current text-yellow-400" />
                        <span>{item.owner.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{item.owner.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleRequestSwap(item.id)}
                  className="w-full gradient-primary text-white hover:opacity-90"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Request Swap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="glass border-white/20 text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or browse different categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSize('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Browse;

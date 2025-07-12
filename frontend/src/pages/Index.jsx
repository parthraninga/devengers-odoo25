
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowRight, 
  Recycle, 
  Users, 
  Heart, 
  Zap,
  Star,
  Shirt,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle,
  Leaf,
  Award,
  Clock
} from 'lucide-react';

const Index = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Sustainable Fashion",
      description: "Give your clothes a second life and reduce fashion waste through community swapping.",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500/10"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Connect with like-minded individuals who share your passion for sustainable living.",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-500/10"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Quality First",
      description: "All items are verified for quality, ensuring you receive beautiful pre-loved pieces.",
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-500/10"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Swaps",
      description: "Quick and easy swapping process with real-time notifications and updates.",
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-500/10"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fashion Blogger",
      avatar: "SC",
      content: "ReWear has transformed how I approach fashion. I've discovered amazing pieces while decluttering my wardrobe sustainably.",
      rating: 5,
      color: "from-purple-400 to-violet-600"
    },
    {
      name: "Mike Rodriguez",
      role: "Environmental Activist", 
      avatar: "MR",
      content: "Finally, a platform that makes sustainable fashion accessible and fun. The community here is incredible!",
      rating: 5,
      color: "from-cyan-400 to-blue-600"
    },
    {
      name: "Emma Thompson",
      role: "Student",
      avatar: "ET", 
      content: "As a student, ReWear helps me stay stylish on a budget while being environmentally conscious.",
      rating: 5,
      color: "from-pink-400 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            top: '60%',
            right: '10%',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            bottom: '10%',
            left: '50%',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/browse" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Browse</Link>
              <Link to="/#features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Features</Link>
              <Link to="/#about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">About</Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  Dashboard
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-purple-600 font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container-padding max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-8 animate-fade-in">
            <Badge 
              variant="secondary" 
              className="backdrop-blur-md bg-white/10 border border-white/20 text-purple-700 dark:text-purple-300 px-6 py-3 text-sm font-medium rounded-full shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Join the Sustainable Fashion Revolution
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent block">
                  Swap, Share
                </span>
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent block">
                  & Shine
                </span>
                <span className="text-gray-900 dark:text-white block text-4xl md:text-5xl lg:text-6xl mt-4">
                  with ReWear
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Transform your wardrobe sustainably. Connect with a community that values 
                <span className="font-semibold text-purple-600"> style</span>, 
                <span className="font-semibold text-emerald-600"> sustainability</span>, and 
                <span className="font-semibold text-blue-600"> sharing</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                onClick={() => navigate(user ? '/browse' : '/register')}
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300"
              >
                {user ? 'Start Browsing' : 'Join ReWear Free'}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/browse')}
                className="group backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 px-10 py-4 text-lg font-semibold rounded-2xl text-gray-700 dark:text-gray-200 hover:text-purple-600 transition-all duration-300"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Explore Items
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-12 pt-12">
              {[
                { label: 'Items Swapped', value: '5K+', icon: <Recycle className="h-5 w-5" /> },
                { label: 'Happy Users', value: '2K+', icon: <Users className="h-5 w-5" /> },
                { label: 'Cities', value: '100+', icon: <Globe className="h-5 w-5" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="text-purple-600 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container-padding max-w-7xl mx-auto">
          <div id='features'
            data-animate
            className={`text-center space-y-6 mb-20 transition-all duration-1000 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full">
              <Heart className="h-4 w-4 mr-2" />
              Why Choose ReWear
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Fashion with
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Purpose</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Experience a revolutionary way to refresh your wardrobe while making a positive impact on our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`group backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${
                  isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-padding max-w-7xl mx-auto">
          <div id='testimonials'
            data-animate
            className={`text-center space-y-6 mb-20 transition-all duration-1000 ${
              isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full">
              <Star className="h-4 w-4 mr-2" />
              User Stories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                What Our Community
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Says</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`group backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600" />
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Animated shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container-padding max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Your Wardrobe?
              </span>
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light">
              Join thousands of fashion lovers who are making a difference, one swap at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => navigate(user ? '/browse' : '/register')}
                size="lg"
                className="group bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {user ? 'Start Swapping Now' : 'Join Free Today'}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/browse')}
                className="group border-white/30 text-white hover:bg-white/10 backdrop-blur-md px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Browse Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
                  <Shirt className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Sustainable fashion for everyone. Join our community and make a difference.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Browse Items', 'How it Works', 'Community', 'Success Stories']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Contact']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Safety', 'Guidelines', 'Terms']
              }
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 ReWear. All rights reserved.</p>
            <p className="text-gray-400 flex items-center mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for sustainable fashion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

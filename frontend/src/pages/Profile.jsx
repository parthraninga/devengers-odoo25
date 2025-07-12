import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Camera, Star, Package, ArrowLeftRight, Award, Edit3, Save, Loader2 } from 'lucide-react';
import userService from '../services/userService';
import itemService from '../services/itemService';
import swapService from '../services/swapService';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: ''
  });
  
  const [stats, setStats] = useState([
    { label: 'Items Listed', value: '0', icon: Package, color: 'blue' },
    { label: 'Successful Swaps', value: '0', icon: ArrowLeftRight, color: 'green' },
    { label: 'Points Earned', value: '0', icon: Star, color: 'yellow' },
    { label: 'Rating', value: '0', icon: Award, color: 'purple' }
  ]);

  const [recentItems, setRecentItems] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user._id) {
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Fetch user data
        const userData = await userService.getUserById(user._id);
        
        console.log('User Data:', userData);
        console.log('User Data profile pic :', userData?.data?.profilePic?.url);
        
        if (userData?.data) {
          const profileInfo = userData.data;
          console.log('User Data profile pic :', profileInfo.profilePic.url);
          
          setProfileData({
            name: profileInfo.name,
            email: profileInfo.email,
            location: profileInfo.location,
            bio: profileInfo.bio, 
            profilePic: profileInfo.profilePic.url, 
            mobile: profileInfo.mobile
          });
        }

        // Fetch user's items
        // const itemsData = await itemService.getUserItems();
        // if (itemsData.success && itemsData.data) {
        //   // Set recent items (latest 3)
        //   const latestItems = itemsData.data.slice(0, 3).map(item => ({
        //     id: item._id,
        //     title: item.title,
        //     image: item.images && item.images.length > 0 ? item.images[0] : '',
        //     status: item.status,
        //     points: item.points || 0
        //   }));
          
        //   setRecentItems(latestItems);
          
        //   // Update stats
        //   const totalItems = itemsData.data.length;
        //   updateStats('Items Listed', String(totalItems));
        // }

        // // Fetch user's swaps
        // const swapsData = await swapService.getUserSwaps();
        // if (swapsData.success && swapsData.data) {
        //   // Count completed swaps
        //   const completedSwaps = swapsData.data.filter(swap => swap.status === 'completed').length;
        //   updateStats('Successful Swaps', String(completedSwaps));
          
        //   // Calculate total points from completed swaps
        //   const points = swapsData.data
        //     .filter(swap => swap.status === 'completed')
        //     .reduce((total, swap) => total + (swap.points || 0), 0);
        //   updateStats('Points Earned', String(points));
          
        //   // Calculate average rating if available
        //   if (userData.data.rating) {
        //     updateStats('Rating', userData.data.rating.toFixed(1));
        //   }
        // }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Update a specific stat
  const updateStats = (label, value) => {
    setStats(currentStats => 
      currentStats.map(stat => 
        stat.label === label ? { ...stat, value } : stat
      )
    );
  };

  // Handle profile picture change
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Check file type
    const fileTypes = /jpeg|jpg|png|gif/;
    const validFileType = fileTypes.test(file.type);
    
    if (!validFileType) {
      toast.error("Only image files (JPEG, JPG, PNG, GIF) are allowed");
      return;
    }
    
    // Check file size (max 1MB)
    if (file.size > 1000000) {
      toast.error("File size must be less than 1MB");
      return;
    }
    
    setProfilePicture(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  // Save profile changes
const handleSave = async () => {
  if (!user || !user._id) {
    toast.error('User information not available');
    return;
  }
  
  setIsSaving(true);
  
  try {
    // First, upload profile picture if changed
    if (profilePicture) {
      const formData = new FormData();
      formData.append('profilePic', profilePicture);
      
      try {
        const uploadResult = await userService.uploadSingleFile(user._id, formData);
        console.log('Upload result:', uploadResult);
        
        if (uploadResult) {
          // Update profileData with the new image URL from Cloudinary
          setProfileData(prev => ({
            ...prev,
            profilePic: {
              url: uploadResult.data.secure_url,
              cloudinaryId: uploadResult.data.public_id
            }
          }));
          
          // Wait a moment for state to update
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (uploadError) {
        console.error('Error uploading profile picture:', uploadError);
        toast.error('Failed to upload profile picture');
        // Continue with profile update even if image upload fails
      }
    }
    
    // Then update user profile data
    // Make sure we're not sending circular structures to the API
    const updateResult = await userService.updateUser(user._id, {
      name: profileData.name,
      email: profileData.email,
      mobile: profileData.mobile,
      location: profileData.location,
      bio: profileData.bio,
      mobile: profileData.mobile
    });
    
    toast.success('Profile updated successfully!');
    setIsEditing(false);
    setProfilePicturePreview(null); // Reset the preview
    setProfilePicture(null); // Reset the file
    
    // Refresh user data to get the latest updates
    const refreshedUserData = await userService.getUserById(user._id);
    if (refreshedUserData?.data) {
      const profileInfo = refreshedUserData.data;
      
      setProfileData({
        name: profileInfo.name || '',
        email: profileInfo.email || '',
        phone: profileInfo.phone || '',
        location: profileInfo.location || '',
        bio: profileInfo.bio || '',
        profilePic: profileInfo.profilePic || { url: '' },
        avatar: profileInfo.profilePic?.url || '',
        mobile: profileInfo.mobile || ''
      });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Failed to update profile');
  } finally {
    setIsSaving(false);
  }
};

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-500/10 text-green-600',
      swapped: 'bg-blue-500/10 text-blue-600',
      pending: 'bg-yellow-500/10 text-yellow-600'
    };
    return colors[status] || colors.available;
  };

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-600',
      green: 'bg-green-500/10 text-green-600',
      yellow: 'bg-yellow-500/10 text-yellow-600',
      purple: 'bg-purple-500/10 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-2xl shadow-purple-500/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <img
                    src={profilePicturePreview || profileData.profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={!isEditing} 
                    />
                  </label>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {profileData.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {profileData.bio || 'No bio yet'}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{profileData.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="h-12 px-6"
                  disabled={isSaving}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50"
                      />
                    </div>
                    <Button 
                      onClick={handleSave} 
                      className="w-full h-12"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Recent Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Items</CardTitle>
                    <CardDescription>Your latest clothing listings</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = '/add-item'}>
                    Add New Item
                  </Button>
                </CardHeader>
                <CardContent>
                  {recentItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recentItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 hover:shadow-lg transition-all duration-300"
                          onClick={() => window.location.href = `/items/${item.id}`}
                        >
                          <img
                            src={item.image || 'https://via.placeholder.com/200x150'}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <span className="text-sm font-medium text-purple-600">{item.points} pts</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">You haven't listed any items yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => window.location.href = '/add-item'}
                      >
                        Add Your First Item
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20">
                <CardHeader>
                  <CardTitle>Profile Stats</CardTitle>
                  <CardDescription>Your activity overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getStatColor(stat.color)}`}>
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Badge - Only show if they have swaps */}
            {parseInt(stats.find(s => s.label === 'Successful Swaps')?.value || '0') > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-800/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Eco Warrior</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {`Congratulations! You've saved ${stats.find(s => s.label === 'Successful Swaps')?.value || '0'} items from landfills through sustainable swapping.`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, User, ArrowRight, Shield, Heart, Star, Image as ImageIcon, Phone, Calendar, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        age: "",
        gender: "",
        profilePicture: null,
    });
    const [previewUrl, setPreviewUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePicture: file,
            }));

            // Create preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            // Pass all user data to register function
            await addUser(formData.name, formData.email, formData.password, formData.mobile, formData.age, formData.gender);
            toast.success("Welcome to ReWear! 🎉");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Join ReWear</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Start your sustainable fashion journey</p>
                </div>

                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-2xl shadow-purple-500/10">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">Join thousands of sustainable fashion lovers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile Number Field */}
                            <div className="space-y-2">
                                <Label htmlFor="mobile" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Mobile Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter your mobile number"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Age Field */}
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Age
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        min="16"
                                        max="120"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Enter your age"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gender Field */}
                            <div className="space-y-2">
                                <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Gender
                                </Label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                                    <Select onValueChange={(value) => handleSelectChange("gender", value)} defaultValue={formData.gender}>
                                        <SelectTrigger className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] group">
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Create Account</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Benefits */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">Join ReWear and enjoy:</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>Eco-friendly swapping</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span>Quality guarantee</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span>Secure platform</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                    <span>Free to use</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Trust indicators */}
                <div className="text-center mt-8 space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">🔒 Your data is secure and protected</p>
                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                        <span>✓ SSL Encrypted</span>
                        <span>✓ Privacy Protected</span>
                        <span>✓ GDPR Compliant</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Phone, 
  Key,
  MessageSquare
} from "lucide-react";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState("email-password");
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const { 
        loginWithEmailPassword, 
        loginWithMobilePassword,
        sendEmailOTP,
        verifyEmailOTP,
        sendMobileOTP,
        verifyMobileOTP
    } = useAuth();

    const resetForm = () => {
        setIdentifier("");
        setPassword("");
        setOtp("");
        setOtpSent(false);
    };

    const handleSendOTP = async () => {
        if (!identifier) {
            toast.error(loginMethod.includes("email") ? "Email is required" : "Mobile number is required");
            return;
        }

        setIsLoading(true);
        try {
            let result;
            if (loginMethod === "email-otp") {
                result = await sendEmailOTP(identifier);
            } else if (loginMethod === "mobile-otp") {
                result = await sendMobileOTP(identifier);
            }

            if (result?.success) {
                setOtpSent(true);
                toast.success(`OTP sent to your ${loginMethod.includes("email") ? "email" : "mobile"}`);
            }
        } catch (error) {
            toast.error(error.message || `Failed to send OTP to your ${loginMethod.includes("email") ? "email" : "mobile"}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error("OTP is required");
            return;
        }

        setIsLoading(true);
        try {
            let result;
            if (loginMethod === "email-otp") {
                result = await verifyEmailOTP(identifier, otp);
            } else if (loginMethod === "mobile-otp") {
                result = await verifyMobileOTP(identifier, otp);
            }

            if (result?.success) {
                toast.success("Welcome back! 🎉");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.message || "OTP verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!identifier) {
            toast.error(loginMethod.includes("email") ? "Email is required" : "Mobile number is required");
            return;
        }
        
        if (!password) {
            toast.error("Password is required");
            return;
        }

        setIsLoading(true);
        try {
            let result;
            if (loginMethod === "email-password") {
                result = await loginWithEmailPassword(identifier, password);
            } else if (loginMethod === "mobile-password") {
                result = await loginWithMobilePassword(identifier, password);
            }

            if (result?.success) {
                toast.success("Welcome back! 🎉");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (loginMethod.includes("otp")) {
            if (otpSent) {
                await handleVerifyOTP();
            } else {
                await handleSendOTP();
            }
        } else {
            await handleLogin();
        }
    };

    const switchLoginMethod = (method) => {
        setLoginMethod(method);
        resetForm();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/20 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/25">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Continue your sustainable journey</p>
                </div>

                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-2xl shadow-indigo-500/10">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">Choose your login method</CardDescription>
                    </CardHeader>

                    {/* Login Method Tabs */}
                    <div className="px-6 mb-4">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    variant={loginMethod === "email-password" ? "default" : "outline"}
                                    className={`h-12 rounded-xl ${loginMethod === "email-password" ? "gradient-primary text-white" : ""}`}
                                    onClick={() => switchLoginMethod("email-password")}
                                >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email + Password
                                </Button>
                                <Button
                                    type="button"
                                    variant={loginMethod === "email-otp" ? "default" : "outline"}
                                    className={`h-12 rounded-xl ${loginMethod === "email-otp" ? "gradient-primary text-white" : ""}`}
                                    onClick={() => switchLoginMethod("email-otp")}
                                >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Email + OTP
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    variant={loginMethod === "mobile-password" ? "default" : "outline"}
                                    className={`h-12 rounded-xl ${loginMethod === "mobile-password" ? "gradient-primary text-white" : ""}`}
                                    onClick={() => switchLoginMethod("mobile-password")}
                                >
                                    <Phone className="h-4 w-4 mr-2" />
                                    Mobile + Password
                                </Button>
                                <Button
                                    type="button"
                                    variant={loginMethod === "mobile-otp" ? "default" : "outline"}
                                    className={`h-12 rounded-xl ${loginMethod === "mobile-otp" ? "gradient-primary text-white" : ""}`}
                                    onClick={() => switchLoginMethod("mobile-otp")}
                                >
                                    <Key className="h-4 w-4 mr-2" />
                                    Mobile + OTP
                                </Button>
                            </div>
                        </div>
                    </div>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Identifier Field (Email or Mobile) */}
                            {!otpSent && (
                                <div className="space-y-2">
                                    <Label htmlFor="identifier" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        {loginMethod.includes("email") ? "Email Address" : "Mobile Number"}
                                    </Label>
                                    <div className="relative">
                                        {loginMethod.includes("email") ? (
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        )}
                                        <Input
                                            id="identifier"
                                            type={loginMethod.includes("email") ? "email" : "tel"}
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            placeholder={loginMethod.includes("email") ? "Enter your email" : "Enter your mobile number"}
                                            className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Field */}
                            {(loginMethod === "email-password" || loginMethod === "mobile-password") && (
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* OTP Field */}
                            {otpSent && (loginMethod === "email-otp" || loginMethod === "mobile-otp") && (
                                <div className="space-y-2">
                                    <Label htmlFor="otp" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Enter OTP
                                    </Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="otp"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter OTP code"
                                            className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleSendOTP}
                                            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Actions Row */}
                            {(loginMethod === "email-password" || loginMethod === "mobile-password") && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link to="/forget-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] group">
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{loginMethod.includes("otp") ? (otpSent ? "Verifying..." : "Sending...") : "Signing In..."}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>
                                            {loginMethod.includes("otp") 
                                                ? (otpSent ? "Verify OTP" : "Send OTP") 
                                                : "Sign In"}
                                        </span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            <Button variant="outline" className="h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Security notice */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">🔒 Secure login with end-to-end encryption</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
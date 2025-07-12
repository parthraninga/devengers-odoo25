import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";
import userService from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Helper function to handle successful login
    const handleLoginSuccess = async (response, userEmail = null, userMobile = null) => {
        const { accessToken, refreshToken } = response.tokens;
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        // Get user data
        let userData;
        if (userEmail) {
            const responseUser = await userService.getUserByEmail(userEmail);
            userData = responseUser.data;
        } else if (userMobile) {
            // You would need to implement this endpoint in your backend
            const responseUser = await userService.getUserByMobile(userMobile);
            userData = responseUser.data;
        }
        
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
        return {
            success: true,
            message: response.message
        };
    };

    // User registration
    const addUser = async (userData) => {
        try {
            const response = await authService.addUser(userData);
            toast.success("User registered successfully!");
            return {
                success: true,
                data: response,
            };
        } catch (error) {
            const message = error.response?.data?.message || "User registration failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };

    // 1. Email + Password login
    const loginWithEmailPassword = async (email, password) => {
        try {
            const response = await authService.loginWithEmailPassword(email, password);
            toast.success("Login successful!");
            return await handleLoginSuccess(response, email);
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };
    
    // 2. Mobile + Password login
    const loginWithMobilePassword = async (mobile, password) => {
        try {
            const response = await authService.loginWithMobilePassword(mobile, password);
            toast.success("Login successful!");
            return await handleLoginSuccess(response, null, mobile);
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };
    
    // 3. Email + OTP login
    const sendEmailOTP = async (email) => {
        try {
            const response = await authService.sendEmailOTP(email);
            toast.success("OTP sent to your email!");
            return {
                success: true,
                message: response.message,
            };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };
    
    const verifyEmailOTP = async (email, otp) => {
        try {
            const response = await authService.verifyEmailOTP(email, otp);
            toast.success("OTP verified successfully!");
            return await handleLoginSuccess(response, email);
        } catch (error) {
            const message = error.response?.data?.message || "OTP verification failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };
    
    // 4. Mobile + OTP login
    const sendMobileOTP = async (mobile) => {
        try {
            const response = await authService.sendMobileOTP(mobile);
            toast.success("OTP sent to your mobile!");
            return {
                success: true,
                message: response.message,
            };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };
    
    const verifyMobileOTP = async (mobile, otp) => {
        try {
            const response = await authService.verifyMobileOTP(mobile, otp);
            toast.success("OTP verified successfully!");
            return await handleLoginSuccess(response, null, mobile);
        } catch (error) {
            const message = error.response?.data?.message || "OTP verification failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };

    // Logout user
    const logoutUser = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await authService.logoutUser(refreshToken);
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    // Keep existing methods
    const forgetPassword = async (email) => {
        try {
            const response = await authService.forgetPassword(email);
            toast.success("Password reset link sent to your email!");
            return {
                success: true,
                message: response.message,
            };
        } catch (error) {
            const message = error.response?.data?.message || "Forget password failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };

    const resetPassword = async (email, newPassword) => {
        try {
            const response = await authService.resetPassword(email, newPassword);
            toast.success("Password has been reset successfully.");
            return {
                success: true,
                message: response.message,
            };
        } catch (error) {
            const message = error.response?.data?.message || "Reset password failed";
            toast.error(message);
            return {
                success: false,
                message: message,
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                addUser,
                loginWithEmailPassword,
                loginWithMobilePassword,
                sendEmailOTP,
                verifyEmailOTP,
                sendMobileOTP,
                verifyMobileOTP,
                logoutUser,
                forgetPassword,
                resetPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SocketProvider } from "./contexts/SocketContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import AddItem from "./pages/AddItem";
import Profile from "./pages/Profile";
import SwapHistory from "./pages/SwapHistory";
import NotFound from "./pages/NotFound";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Admin
import AdminRoutes from "./routes/AdminRoutes";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="rewear-ui-theme">
            <AuthProvider>
                <SocketProvider>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                            <div className="min-h-screen bg-background text-foreground">
                                <Routes>
                                    {/* Main App Routes */}
                                    <Route path="/" element={<Index />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forget-password" element={<ForgetPassword />} />
                                    <Route path="/reset-password" element={<ResetPassword />} />
                                    <Route
                                        path="/browse"
                                        element={
                                            <>
                                                <Navbar />
                                                <Browse />
                                                <Footer />
                                            </>
                                        }
                                    />

                                    {/* Protected Routes */}
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Navbar />
                                                    <Dashboard />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/add-item"
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Navbar />
                                                    <AddItem />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Navbar />
                                                    <Profile />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/swaps"
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Navbar />
                                                    <SwapHistory />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />

                                    {/* Admin Routes */}
                                    <Route path="/admin/*" element={<AdminRoutes />} />

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </div>
                        </BrowserRouter>
                    </TooltipProvider>
                </SocketProvider>
            </AuthProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;

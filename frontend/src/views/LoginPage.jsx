import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { authAPI } from "../api/index.js";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(credentials);

      if (response.success) {
        // Store token and user data
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Navigate to intended destination or admin dashboard
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-white text-center max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Welcome Back to CampusMitra
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Access your admin dashboard to manage documents, monitor AI
            assistant performance, and keep your university portal up to date.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-100">Documents Managed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-100">System Monitoring</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-full transform translate-x-1/2"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={goBack}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          {/* Mobile Branding */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CampusMitra Admin
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Sign In
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your admin credentials to continue
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center">
                    <div className="w-4 h-4 border-2 border-red-500 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    disabled={isLoading}
                    className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-amber-800 mb-2">
                Demo Credentials
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white rounded px-3 py-2">
                  <div className="font-medium text-amber-700">Username</div>
                  <div className="text-amber-600">admin</div>
                </div>
                <div className="bg-white rounded px-3 py-2">
                  <div className="font-medium text-amber-700">Password</div>
                  <div className="text-amber-600">password</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

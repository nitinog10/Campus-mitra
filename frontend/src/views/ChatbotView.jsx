import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Settings,
  Menu,
  X,
} from "lucide-react";
import ChatWidget from "../components/chat/ChatWidget/ChatWidget.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";

const ChatbotView = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAdminLogin = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CampusMitra
                  </h1>
                  <span className="text-xs text-gray-500">
                    AI-Powered University Portal
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#home"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Home
                </a>
                <a
                  href="#academics"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Academics
                </a>
                <a
                  href="#admissions"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Admissions
                </a>
                <a
                  href="#students"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Students
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Contact
                </a>
              </nav>

              {/* Desktop Admin Button */}
              <Button
                onClick={handleAdminLogin}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
              <div className="px-4 py-3 space-y-3">
                <a
                  href="#home"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#academics"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Academics
                </a>
                <a
                  href="#admissions"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admissions
                </a>
                <a
                  href="#students"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Students
                </a>
                <a
                  href="#contact"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="pt-3 border-t">
                  <Button
                    onClick={() => {
                      handleAdminLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin Portal</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-gray-900 sm:text-6xl mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Smart Campus
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of university life with our AI-powered
              assistant. Get instant answers, access resources, and stay
              connected with your academic journey - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                onClick={() =>
                  document
                    .querySelector(".fixed.bottom-6.right-6 button")
                    .click()
                }
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Chatting with AI
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleAdminLogin}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                <Settings className="mr-2 h-5 w-5" />
                Admin Access
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600">
                  AI Assistant Available
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-600">
                  Questions Answered Daily
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  95%
                </div>
                <div className="text-sm text-gray-600">
                  Student Satisfaction
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  &lt;2s
                </div>
                <div className="text-sm text-gray-600">
                  Average Response Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="academics" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI assistant helps you navigate university life effortlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Academic Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Access course materials, syllabi, examination schedules, and
                  academic announcements instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Student Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Handle fee payments, transcript requests, hostel applications,
                  and other administrative tasks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Get instant, accurate answers to your questions about
                  admissions, academics, and campus life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Event Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Stay updated with campus events, important dates, and deadline
                  reminders.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Campus Navigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Find your way around campus with interactive maps and
                  location-based information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Track your grades, attendance, and academic milestones
                  throughout your journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Smart Campus Life?
          </h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who are already using our AI assistant to
            navigate their university journey. Get instant answers, stay
            organized, and never miss important updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={() =>
                document.querySelector(".fixed.bottom-6.right-6 button").click()
              }
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Try the AI Assistant Now
            </Button>
            <p className="text-blue-100 text-sm">
              Available 24/7 • No registration required
            </p>
          </div>

          {/* Floating Arrow */}
          <div className="mt-8 flex justify-center">
            <div className="animate-bounce">
              <svg
                className="w-8 h-8 text-blue-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">CampusMitra</h4>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering students with AI-driven assistance for a seamless
                university experience. Get instant answers, stay informed, and
                excel in your academic journey.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#academics"
                    className="hover:text-white transition-colors"
                  >
                    Academics
                  </a>
                </li>
                <li>
                  <a
                    href="#admissions"
                    className="hover:text-white transition-colors"
                  >
                    Admissions
                  </a>
                </li>
                <li>
                  <a
                    href="#students"
                    className="hover:text-white transition-colors"
                  >
                    Students
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@campusmitra.edu
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 University Ave
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 CampusMitra. All rights reserved. Powered by AI for
              better student experience.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default ChatbotView;

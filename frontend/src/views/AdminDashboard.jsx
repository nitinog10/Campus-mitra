import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Upload, FileText, Menu, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet.jsx";
import DocumentManager from "../components/document/DocumentManager.jsx";
import ChatTranscripts from "../components/chat/ChatTranscripts.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("documents");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const navigation = [
    { id: "documents", name: "Document Manager", icon: FileText },
    { id: "chats", name: "Chat Transcripts", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "documents":
        return <DocumentManager />;
      case "chats":
        return <ChatTranscripts />;
      default:
        return <DocumentManager />;
    }
  };

  const Sidebar = ({ className = "" }) => (
    <div className={`bg-white border-r h-full ${className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">CampusMitra</h2>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 relative">
        <Sidebar />
      </div>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">CampusMitra Admin</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navigation.find((item) => item.id === activeTab)?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your university documents and announcements
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {user?.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;

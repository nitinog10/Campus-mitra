import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import DesktopSidebar from "../sidebar/DesktopSidebar";
import MobileSidebar from "../sidebar/MobileSidebar";
import ChatArea from "../chat/ChatArea";
import { useChat } from "../../hooks/useChat";

const ChatLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { messages, inputValue, setInputValue, sendMessage } = useChat();

  const handleSendMessage = () => {
    sendMessage();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSidebar = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2 bg-white shadow-md"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Chat Area */}
      <ChatArea
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onMobileMenuToggle={toggleMobileMenu}
      />
    </div>
  );
};

export default ChatLayout;

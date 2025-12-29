import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

const MessageInput = ({ inputValue, setInputValue, onSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about campus..."
          className="flex-1 text-sm sm:text-base"
        />
        <Button
          onClick={onSendMessage}
          disabled={!inputValue.trim()}
          className="px-4 sm:px-6"
        >
          <span className="hidden sm:inline">Send</span>
          <ChevronRight className="w-4 h-4 sm:hidden" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Powered by AI • Press Enter to send
      </p>
    </div>
  );
};

export default MessageInput;

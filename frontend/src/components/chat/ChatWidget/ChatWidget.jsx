import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, ChevronDown, Send, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "../../../hooks/useChat.js";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";
import { ScrollArea } from "../../ui/scroll-area.jsx";
import SourceSuggestions from "../SourceSuggestions.jsx";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading,
    handleSuggestionClick,
  } = useChat();
  const scrollAreaRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match optimized animation duration
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (
      trimmed &&
      trimmed.length >= 2 &&
      trimmed.length <= 1000 &&
      !isLoading
    ) {
      sendMessage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 left-4 top-20 sm:bottom-20 sm:right-4 sm:left-auto sm:top-auto sm:w-[420px] sm:h-[650px] z-50 shadow-2xl chat-widget-container ${
            isClosing ? "animate-chat-to-fab" : "animate-fab-to-chat"
          }`}
        >
          <Card className="h-full flex flex-col overflow-hidden border-0 shadow-xl transform-gpu py-0">
            <CardHeader className="pb-3 px-5 py-4 border-b bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-t-lg flex-shrink-0 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce-in backdrop-blur-sm">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white font-semibold">
                      CampusMitra
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                      <span className="text-xs text-blue-100 font-medium">
                        AI Assistant Online
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90 rounded-full"
                >
                  <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
              {/* Messages Area */}
              <ScrollArea
                ref={scrollAreaRef}
                className="flex-1 px-5 py-3 overflow-y-auto"
              >
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex flex-col space-y-2 animate-slide-up"
                    >
                      <div
                        className={`flex items-start space-x-3 ${
                          message.sender === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === "user"
                              ? "bg-blue-600"
                              : message.isError
                              ? "bg-red-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot
                              className={`h-4 w-4 ${
                                message.isError
                                  ? "text-red-600"
                                  : "text-gray-600"
                              }`}
                            />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`max-w-[320px] ${
                            message.sender === "user" ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm break-words shadow-sm ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                                : message.isError
                                ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-md"
                                : "bg-gray-50 text-gray-900 rounded-bl-md border border-gray-100"
                            }`}
                          >
                            {message.content_type === "markdown" ? (
                              <div className="prose prose-sm prose-blue max-w-none leading-relaxed">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {message.text}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p className="whitespace-pre-wrap leading-relaxed">
                                {message.text}
                              </p>
                            )}
                          </div>

                          {/* Source Suggestions for bot messages */}
                          {message.sender === "bot" &&
                            message.topSourceSuggestions &&
                            message.topSourceSuggestions.length > 0 && (
                              <div className="mt-2 max-w-[320px]">
                                <SourceSuggestions
                                  suggestions={message.topSourceSuggestions}
                                  onSuggestionClick={handleSuggestionClick}
                                />
                              </div>
                            )}

                          {/* Timestamp */}
                          <div
                            className={`text-xs text-gray-500 mt-1 px-1 ${
                              message.sender === "user"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator - Enhanced */}
                  {isLoading && (
                    <div className="flex items-start space-x-3 animate-fade-in">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 rounded-bl-md border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area - Enhanced */}
              <div className="border-t bg-gradient-to-r from-gray-50 to-white p-4 flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about university..."
                      disabled={isLoading}
                      className="w-full pr-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
                      maxLength={500}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {inputValue.length}/500
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Press Enter to send
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={isOpen ? handleClose : handleOpen}
          className={`w-16 h-16 rounded-full shadow-lg transition-smooth transform-gpu ${
            isOpen
              ? "bg-gray-600 hover:bg-gray-700 scale-95"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-110 shadow-blue-500/25"
          }`}
        >
          {isOpen ? (
            <ChevronDown className="h-6 w-6 text-white transition-transform duration-300" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white transition-transform duration-300" />
          )}
        </Button>

        {/* Message count badge */}
        {!isOpen && messages.length > 1 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium animate-bounce">
            {messages.length - 1}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;

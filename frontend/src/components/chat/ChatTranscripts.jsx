import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Trash2,
  Eye,
  User,
  Bot,
  Clock,
  Search,
} from "lucide-react";
import { chatAPI } from "../../api/index.js";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { ScrollArea } from "../ui/scroll-area.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  showSuccessToast,
  showErrorToast,
  showConfirmDialog,
} from "../../utils/toast.js";

const ChatTranscripts = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchConversations(currentPage);
  }, [currentPage]);

  const fetchConversations = async (page = 1) => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations(page, 10);

      setConversations(response.conversations || []);
      setPagination(response.pagination || {});
    } catch (error) {
      showErrorToast("Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchConversationDetail = async (id) => {
    try {
      setDetailLoading(true);
      const response = await chatAPI.getConversation(id);
      setSelectedConversation(response.conversation);
    } catch (error) {
      showErrorToast("Failed to fetch conversation details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (id, event) => {
    if (event) {
      event.stopPropagation(); // Prevent conversation selection when deleting
    }

    const isConfirmed = await showConfirmDialog(
      "Delete Conversation",
      "Are you sure you want to delete this conversation? This action cannot be undone."
    );

    // Only proceed if user confirmed
    if (!isConfirmed) {
      return; // User cancelled, exit early
    }

    try {
      const response = await chatAPI.deleteConversation(id);

      if (response && response.success) {
        showSuccessToast("Conversation deleted successfully!");

        // Clear selection if we're deleting the currently selected conversation
        if (selectedConversation?.id === id) {
          setSelectedConversation(null);
        }

        // Refresh the conversation list
        await fetchConversations(currentPage);
      } else {
        showErrorToast("Failed to delete conversation - no success response");
      }
    } catch (error) {
      showErrorToast(error.message || "Failed to delete conversation");
    }
  };
  const handleConversationClick = (conv) => {
    // If clicking the same conversation, unselect it
    if (selectedConversation?.id === conv.id) {
      setSelectedConversation(null);
    } else {
      // Otherwise, fetch and select the new conversation
      fetchConversationDetail(conv.id);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Invalid Date";
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatDuration = (start, end) => {
    if (!start || !end) return "N/A";
    try {
      const duration = new Date(end) - new Date(start);
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    } catch (error) {
      return "N/A";
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (conv.userIp && conv.userIp.includes(searchTerm))
  );

  return (
    <div className="h-full w-full max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Left Column - Conversation List */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex-shrink-0 pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chat Transcripts</span>
            </CardTitle>
            <CardDescription>
              View and manage user conversations ({filteredConversations.length}{" "}
              total)
            </CardDescription>

            {/* Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 px-6 pb-2">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>
                    {searchTerm
                      ? "No conversations match your search"
                      : "No conversations found"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                        selectedConversation?.id === conv.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => handleConversationClick(conv)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              Session:{" "}
                              {conv.sessionId
                                ? conv.sessionId.substring(0, 16)
                                : "Unknown"}
                              ...
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {conv.messageCount || conv.messages?.length || 0}{" "}
                              messages
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {conv.lastMessage || "No messages"}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatDateTime(
                                  conv.lastActivity || conv.updatedAt
                                )}
                              </span>
                            </span>
                            {conv.userIp && <span>IP: {conv.userIp}</span>}
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchConversationDetail(conv.id);
                            }}
                            className="h-8 w-8 p-0"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleDelete(conv.id, e)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete Conversation"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Pagination - Fixed at bottom */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t bg-gray-50 mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Previous clicked, current page:", currentPage);
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                }}
                disabled={!pagination.hasPrev && currentPage <= 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {pagination.currentPage || currentPage} of{" "}
                {pagination.totalPages || "?"} (Total:{" "}
                {pagination.totalConversations || conversations.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Next clicked, current page:", currentPage);
                  setCurrentPage((prev) => prev + 1);
                }}
                disabled={!pagination.hasNext}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Conversation Detail */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex-shrink-0 pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Conversation Details</span>
            </CardTitle>
            {selectedConversation && (
              <CardDescription>
                Session:{" "}
                {selectedConversation.sessionId
                  ? selectedConversation.sessionId.substring(0, 20)
                  : "Unknown"}
                ... • {selectedConversation.messages?.length || 0} messages
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            {detailLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : selectedConversation ? (
              <div className="flex flex-col h-full">
                {/* Conversation Info */}
                <div className="px-6 py-4 border-b bg-gray-50 flex-shrink-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Started:
                      </span>
                      <p className="text-gray-600">
                        {selectedConversation.startTime ||
                        selectedConversation.createdAt
                          ? formatDateTime(
                              selectedConversation.startTime ||
                                selectedConversation.createdAt
                            )
                          : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Activity:
                      </span>
                      <p className="text-gray-600">
                        {selectedConversation.lastActivity ||
                        selectedConversation.updatedAt
                          ? formatDateTime(
                              selectedConversation.lastActivity ||
                                selectedConversation.updatedAt
                            )
                          : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Duration:
                      </span>
                      <p className="text-gray-600">
                        {formatDuration(
                          selectedConversation.startTime ||
                            selectedConversation.createdAt,
                          selectedConversation.lastActivity ||
                            selectedConversation.updatedAt
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        User IP:
                      </span>
                      <p className="text-gray-600">
                        {selectedConversation.userIp || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-4">
                    {selectedConversation.messages &&
                    selectedConversation.messages.length > 0 ? (
                      selectedConversation.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-3 ${
                            message.sender === "user"
                              ? "flex-row-reverse space-x-reverse"
                              : ""
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>

                          <div
                            className={`flex-1 max-w-[80%] ${
                              message.sender === "user" ? "text-right" : ""
                            }`}
                          >
                            <div
                              className={`rounded-lg px-4 py-2 text-sm ${
                                message.sender === "user"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="whitespace-pre-wrap">
                                {message.text || message.message}
                              </p>

                              {message.sources &&
                                message.sources.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    <p className="text-xs opacity-80">
                                      Sources:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {message.sources.map((source, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="secondary"
                                          className="text-xs bg-white/20"
                                        >
                                          {source.title ||
                                            source.name ||
                                            `Source ${idx + 1}`}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                message.sender === "user" ? "text-right" : ""
                              }`}
                            >
                              {message.timestamp || message.createdAt
                                ? formatDateTime(
                                    message.timestamp || message.createdAt
                                  )
                                : "Unknown time"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No messages in this conversation</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a conversation to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatTranscripts;

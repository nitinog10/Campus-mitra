import { useState, useEffect } from "react";
import { chatAPI } from "../api/index.js";

// Session storage keys
const SESSION_KEYS = {
  MESSAGES: "campusmitra_chat_messages",
  CONVERSATION_ID: "campusmitra_conversation_id",
  SESSION_ID: "campusmitra_session_id",
};

// Get session data from sessionStorage
const getSessionData = () => {
  try {
    const messages = JSON.parse(
      sessionStorage.getItem(SESSION_KEYS.MESSAGES) || "[]"
    );
    const conversationId = sessionStorage.getItem(SESSION_KEYS.CONVERSATION_ID);

    // If we have saved messages, return them, otherwise return welcome message
    if (messages.length > 0) {
      return { messages, conversationId };
    }
  } catch (error) {
    console.error("Error loading session data:", error);
  }

  // Return default welcome message
  return {
    messages: [
      {
        id: 1,
        text: "Hello! I'm CampusMitra, your intelligent campus assistant. I can help you with questions about your campus and uploaded documents. Upload PDFs through the admin panel to enable document-specific Q&A!",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
    conversationId: null,
  };
};

// Save session data to sessionStorage
const saveSessionData = (messages, conversationId) => {
  try {
    sessionStorage.setItem(SESSION_KEYS.MESSAGES, JSON.stringify(messages));
    if (conversationId) {
      sessionStorage.setItem(SESSION_KEYS.CONVERSATION_ID, conversationId);
    }
  } catch (error) {
    console.error("Error saving session data:", error);
  }
};

export const useChat = () => {
  const sessionData = getSessionData();
  const [messages, setMessages] = useState(sessionData.messages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(
    sessionData.conversationId
  );

  // Save messages to session storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveSessionData(messages, conversationId);
    }
  }, [messages, conversationId]);

  const sendMessage = async (documentId = null) => {
    const trimmed = inputValue.trim();

    // Validation with user feedback
    if (!trimmed) {
      return; // Do nothing for empty messages
    }

    if (trimmed.length < 2) {
      const errorMessage = {
        id: Date.now(),
        text: "Please enter at least 2 characters to ask a question.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    if (trimmed.length > 1000) {
      const errorMessage = {
        id: Date.now(),
        text: "Your question is too long. Please keep it under 1000 characters.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    if (isLoading) {
      return; // Prevent double-sending
    }

    const userMessage = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = trimmed;
    setInputValue("");
    setIsLoading(true);

    try {
      // Choose the appropriate API call based on whether documentId is provided
      const response = documentId
        ? await chatAPI.askAboutDocument(question, documentId, conversationId)
        : await chatAPI.askQuestion(question, conversationId);

      // Update conversation ID if this is a new conversation or if the old one was invalid
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      const botResponse = {
        id: Date.now() + 1,
        text: response.response,
        sender: "bot",
        timestamp: new Date(),
        content_type: response.content_type || "markdown", // Add content_type field
        sources: response.sources || [],
        documentUsed: response.documentUsed || null,
        topSourceSuggestions: response.topSourceSuggestions || [],
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // If conversation error, clear the conversation ID and show error
      if (error.message && error.message.includes("Conversation not found")) {
        setConversationId(null);
      }

      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    const welcomeMessage = {
      id: 1,
      text: "Hello! I'm CampusMitra, your intelligent campus assistant. I can help you with questions about your campus and uploaded documents. Upload PDFs through the admin panel to enable document-specific Q&A!",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    setConversationId(null);

    // Clear session storage
    sessionStorage.removeItem(SESSION_KEYS.MESSAGES);
    sessionStorage.removeItem(SESSION_KEYS.CONVERSATION_ID);
    sessionStorage.removeItem("sessionId");
  };

  // Add function to manually clear session (for debugging/testing)
  const forceResetSession = () => {
    // Clear all session storage
    sessionStorage.clear();
    localStorage.clear();

    // Reset to initial state
    const welcomeMessage = {
      id: 1,
      text: "Hello! I'm CampusMitra, your intelligent campus assistant. I can help you with questions about your campus.",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    setConversationId(null);
  };

  // Handle suggestion clicks by sending them as new messages
  const handleSuggestionClick = async (suggestion) => {
    if (isLoading) return;

    // Set the input value and send the message
    setInputValue(suggestion);

    // Small delay to ensure input value is set before sending
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading,
    conversationId,
    clearConversation,
    forceResetSession,
    handleSuggestionClick,
  };
};

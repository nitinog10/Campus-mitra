```
import { useState, useEffect } from "react";
import { chatAPI } from "../api/index.js";
import { saveToSessionStorage, getFromSessionStorage } from "../utils/sessionStorage.js";

const SESSION_KEYS = {
  MESSAGES: "campusmitra_chat_messages",
  CONVERSATION_ID: "campusmitra_conversation_id",
  SESSION_ID: "campusmitra_session_id",
};

const getSessionData = () => {
  try {
    const messages = getFromSessionStorage(SESSION_KEYS.MESSAGES, []);
    const conversationId = getFromSessionStorage(SESSION_KEYS.CONVERSATION_ID, null);

    if (messages.length > 0) {
      return { messages, conversationId };
    }
  } catch (error) {
    console.error("Error loading session data:", error);
  }

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

const saveSessionData = (messages, conversationId) => {
  try {
    saveToSessionStorage(SESSION_KEYS.MESSAGES, messages);
    if (conversationId) {
      saveToSessionStorage(SESSION_KEYS.CONVERSATION_ID, conversationId);
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
  const [conversationId, setConversationId] = useState(sessionData.conversationId);

  useEffect(() => {
    if (messages.length > 0) {
      saveSessionData(messages, conversationId);
    }
  }, [messages, conversationId]);

  const sendMessage = async (documentId = null) => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
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
      return;
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
      const response = documentId
       ? await chatAPI.askAboutDocument(question, documentId, conversationId)
        : await chatAPI.askQuestion(question, conversationId);

      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      const botResponse = {
        id: Date.now() + 1,
        text: response.response,
        sender: "bot",
        timestamp: new Date(),
        content_type: response.content_type || "markdown",
        sources: response.sources || [],
        documentUsed: response.documentUsed || null,
        topSourceSuggestions: response.topSourceSuggestions || [],
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
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
    saveToSessionStorage(SESSION_KEYS.MESSAGES, [welcomeMessage]);
    saveToSessionStorage(SESSION_KEYS.CONVERSATION_ID, null);
    saveToSessionStorage("sessionId", null);
  };

  const forceResetSession = () => {
    sessionStorage.clear();
    localStorage.clear();

    const welcomeMessage = {
      id: 1,
      text: "Hello! I'm CampusMitra, your intelligent campus assistant. I can help you with questions about your campus.",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    setConversationId(null);
  };

  const handleSuggestionClick = async (suggestion) => {
    if (isLoading) return;

    setInputValue(suggestion);

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
```
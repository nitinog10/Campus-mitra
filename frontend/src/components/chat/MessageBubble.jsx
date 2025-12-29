import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "../ui/badge.jsx";
import { FileText } from "lucide-react";
import SourceSuggestions from "./SourceSuggestions.jsx";

const MessageBubble = ({ message, onSuggestionClick }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg shadow-sm ${
          message.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="text-sm sm:text-base">
          {message.sender === "user" ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-800">{children}</em>
                  ),
                  code: ({ inline, children, ...props }) =>
                    inline ? (
                      <code
                        className="bg-gray-100 text-blue-600 px-1 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                        <code className="text-sm font-mono" {...props}>
                          {children}
                        </code>
                      </pre>
                    ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-800">{children}</li>
                  ),
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0 text-gray-800 leading-relaxed">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold text-gray-900 mb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold text-gray-900 mb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {children}
                    </h3>
                  ),
                }}
              >
                {String(message.text || "")}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Show sources for bot messages */}
        {message.sender === "bot" &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Sources:</p>
              <div className="flex flex-wrap gap-1">
                {message.sources.map((source, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {source.filename} (p.{source.page})
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {/* Show document used for context */}
        {message.sender === "bot" && message.documentUsed && (
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              📄 {message.documentUsed}
            </Badge>
          </div>
        )}

        {/* Show source suggestions for bot messages */}
        {message.sender === "bot" &&
          message.topSourceSuggestions &&
          message.topSourceSuggestions.length > 0 && (
            <SourceSuggestions
              suggestions={message.topSourceSuggestions}
              onSuggestionClick={onSuggestionClick}
            />
          )}

        <p
          className={`text-xs mt-1 ${
            message.sender === "user" ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formatTimestamp(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;

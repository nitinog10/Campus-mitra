import React from "react";
import { ChevronRight, Star } from "lucide-react";

const SourceSuggestions = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-yellow-500 mr-2" />
        <h4 className="text-sm font-medium text-gray-700">
          Related topics you might want to explore:
        </h4>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full text-left p-2 bg-white rounded-md border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    maxHeight: "2.5rem",
                  }}
                >
                  {suggestion}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors ml-2 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2 italic">
        Click on any suggestion to ask a follow-up question
      </p>
    </div>
  );
};

export default SourceSuggestions;

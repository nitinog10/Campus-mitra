import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, onSuggestionClick }) => {
  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-4 max-w-4xl mx-auto pt-4 pb-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSuggestionClick={onSuggestionClick}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatArea = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  onMobileMenuToggle,
  onSuggestionClick,
}) => {
  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      <ChatHeader isMobile={true} />
      <ChatHeader isMobile={false} />
      <MessageList messages={messages} onSuggestionClick={onSuggestionClick} />
      <div className="border-t bg-white p-3 flex-shrink-0">
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatArea;

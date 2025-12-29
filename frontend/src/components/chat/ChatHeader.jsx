import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ChatHeader = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-sm">🤖</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">Sarathi</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900">Sarathi</h3>
          <p className="text-sm text-gray-600">Your Campus Guide</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

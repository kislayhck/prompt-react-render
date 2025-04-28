
import { Avatar } from "../components/ui/avatar";
import { Card } from "../components/ui/card";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`p-3 max-w-[80%] ${message.isUser ? 'bg-purple-600 text-white' : 'bg-card'}`}>
        <div className="flex items-start gap-3">
          {!message.isUser && (
            <Avatar className="h-8 w-8 bg-purple-200">
              <span className="text-purple-700 font-semibold">AI</span>
            </Avatar>
          )}
          <div>
            <p className="whitespace-pre-wrap">{message.content}</p>
            <p className="text-xs mt-1 opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {message.isUser && (
            <Avatar className="h-8 w-8 bg-purple-800">
              <span className="text-white font-semibold">You</span>
            </Avatar>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatMessage;

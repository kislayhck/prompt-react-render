
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatPanelProps {
  onSendPrompt: (prompt: string) => void;
}

const ChatPanel = ({ onSendPrompt }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your component generator. What would you like me to create for you?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: uuidv4(),
        content: input.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newUserMessage]);
      onSendPrompt(input.trim());
      
      const botMessage: Message = {
        id: uuidv4(),
        content: "Generating your component...",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-purple-600">Component Chat</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe a component to generate..."
            className="flex-1"
          />
          <Button onClick={handleSend} variant="default" className="bg-purple-600 hover:bg-purple-700">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

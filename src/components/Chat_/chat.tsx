import { FC, useState } from "react";

interface ChatProps {
  message: string;
  color: string;
  styles?: string;
}

const Chat: FC<ChatProps> = ({ message, color, styles }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const messageWords = message.split(/\s+/);
  const isLongMessage = messageWords.length > 100;

  return (
    <div className="flex flex-col items-start">
      <div
        className={`bg-${color} ${styles} text-white font-medium px-4 py-2 rounded-2xl rounded-bl-none mb-2 max-w-xs break-words ${
          expanded ? "max-h-full" : "max-h-20 overflow-hidden"
        }`}
      >
        <p>{message}</p>
      </div>
      {isLongMessage && (
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleExpand}
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      )}
    </div>
  );
};

export default Chat;

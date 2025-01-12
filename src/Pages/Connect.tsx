import { useEffect, useState } from "react";
import {
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import ChatSidebar from "../components/Sidebar/ChatSidebar";
import OpenedChat from "../components/Chat_/OpenedChat";

const Connect = () => {
  const { register } = useForm();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://194.5.159.228:3000/api/v1/messages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="bg-background h-screen flex flex-row font-raleway ">
      <ChatSidebar  />
      <div className="w-full">
        {error ? <p>{error}</p> : <OpenedChat messages={messages} />}
      </div>
    </div>
  );
};

export default Connect;

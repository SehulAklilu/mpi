import React from "react";

function GroupChatMessages() {
  const messages = [
    {
      type: "text",
      content: "Hey, how are you?",
      time: "4:30 PM",
      sender: {
        name: "Archer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
      },
    },
    {
      type: "text",
      content: "Hi?",
      time: "4:30 PM",
      sender: {
        name: "Lana",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        status: "offline",
      },
    },
    {
      type: "text",
      content: "Send the image",
      time: "4:30 PM",
      sender: {
        name: "Archer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
      },
    },
    {
      type: "image",
      content: "https://via.placeholder.com/150",
      time: "4:31 PM",
      sender: {
        name: "Lana",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        status: "offline",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex  ${
            message.sender.name === "Archer" ? "justify-end" : "justify-start"
          }`}
        >
          <div className=" p-3 rounded-lg">
            <div className="flex justify-between items-center gap-x-2 py-2">
              <img
                src={message.sender.avatarUrl}
                alt={message.sender.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{message.sender.name}</span>
              <span className="text-lg">{message.time}</span>
            </div>

            {message.type === "text" && (
              <div
                className={`py-2 px-4 w-fit  ${
                  message.sender.name === "Archer"
                    ? "bg-[#F2851C]  text-white rounded-md rounded-tr-none float-end "
                    : "bg-[#D8D8D8] text-black rounded-md rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
            )}
            {message.type === "image" && (
              <img src={message.content} alt="Chat Image" className="rounded" />
            )}
            {message.type === "voice" && (
              <audio controls className="w-full">
                <source src={message.content} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupChatMessages;

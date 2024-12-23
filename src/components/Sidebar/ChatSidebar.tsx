// import { FC, useState, useEffect } from "react";
// import IconButton from "../Button/IconButton";
// import BasicInput from "../Inputs/BasicInput";
// import { UseFormRegister } from "react-hook-form";
// import { Transition } from "@headlessui/react";
// import SingleChat from "../Chat_/singleChat";
// import Cookies from "js-cookie";

// interface ChatSidebarProps {
//   register: UseFormRegister<any>;
// }

// const ChatSidebar: FC<ChatSidebarProps> = ({ register }) => {
//   const [searchOpen, setSearchOpen] = useState<boolean>(false);
//   const [chatList, setChatList] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChats = async () => {
//       const token = Cookies.get("accessToken");
//       console.log(token);

//       if (!token) {
//         setError("Access token not found. Please log in.");
//         return;
//       }

//       try {
//         const response = await fetch("http://194.5.159.228:3000/api/v1/chats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch chats");
//         }

//         const data = await response.json();
//         console.log("Fetched Chats:", data);

//         if (Array.isArray(data)) {
//           const formattedChats = data.map((chat) => ({
//             id: chat._id,
//             chatName: chat.chatName,
//             latestMessage: chat.latestMessage?.content || "No messages yet",
//             time: new Date(chat.latestMessage?.createdAt).toLocaleTimeString(
//               [],
//               { hour: "2-digit", minute: "2-digit" }
//             ),
//             userPhoto:
//               chat.users.find(
//                 (user) => user.id !== chat.latestMessage?.sender.id
//               )?.avatar || "https://via.placeholder.com/150",
//           }));

//           setChatList(formattedChats);
//         } else {
//           console.warn("Unexpected data format:", data);
//           setChatList([]);
//         }
//       } catch (err) {
//         console.error("Error fetching chats:", err);
//         setError(err.message);
//       }
//     };

//     fetchChats();
//   }, []);

//   return (
//     <div className="bg-white border-r w-[28%] px-2 py-4 flex h-screen flex-col gap-3">
//       <div className="flex flex-row justify-between border-b py-2 items-center">
//         <h3 className={`font-bold text-2xl xs-phone:text-2xl text-primary`}>
//           Connect
//         </h3>
//         <div className="flex flex-row gap-5">
//           <IconButton
//             type={"button"}
//             buttonText={"add_comment"}
//             backgroundStyleOn={false}
//             onclick={() => {}}
//             iconColor="black-65"
//             outlined
//           />
//           {searchOpen ? (
//             <IconButton
//               type={"button"}
//               buttonText={"close"}
//               backgroundStyleOn={false}
//               onclick={() => setSearchOpen(false)}
//               iconColor="black-65"
//             />
//           ) : (
//             <IconButton
//               type={"button"}
//               buttonText={"search"}
//               backgroundStyleOn={false}
//               onclick={() => setSearchOpen(true)}
//               iconColor="black-65"
//             />
//           )}
//         </div>
//       </div>
//       <div
//         className={`px-2 flex flex-col ${
//           searchOpen ? "" : "overflow-y-scroll"
//         }`}
//       >
//         <Transition
//           show={searchOpen}
//           enter="transition-opacity duration-500"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity duration-0"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//           className={"flex flex-col gap-3"}
//         >
//           <BasicInput
//             iconName={"search"}
//             outline={false}
//             inputType={""}
//             placeholder={"Search for connection"}
//             name={"searchInput"}
//             register={register}
//           />
//         </Transition>
//         {!searchOpen && (
//           <Transition
//             show={!searchOpen}
//             enter="transition-opacity duration-500"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity duration-500"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//             className={"flex flex-col gap-3"}
//           >
//             {error ? (
//               <p>{error}</p>
//             ) : chatList.length > 0 ? (
//               chatList.map((chat) => (
//                 <SingleChat
//                   key={chat.id}
//                   id={chat.id}
//                   name={chat.chatName || "Unnamed Chat"}
//                   lastText={chat.latestMessage}
//                   time={chat.time}
//                   userPhoto={chat.userPhoto}
//                   setSelected={() => {}}
//                 />
//               ))
//             ) : (
//               <p>No chats available</p>
//             )}
//           </Transition>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSidebar;


import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Chat {
  id: string;
  chatName: string;
  latestMessage: string;
  time: string;
  userPhoto: string;
}

const ChatSidebar: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setError("Access token not found. Please log in.");
        return;
      }

      try {
        // Fetch chats
        const chatResponse = await fetch("http://194.5.159.228:3000/api/v1/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!chatResponse.ok) {
          throw new Error("Failed to fetch chats");
        }

        const chatData = await chatResponse.json();
        const chats = Array.isArray(chatData) ? chatData : chatData.chats || [];

        // Format chat data
        const formattedChats = chats.map((chat: any) => {
          // Extract other users from chat.users
          const otherUsers = chat.users.filter((user: any) => user._id !== token);
          // const chatName =
          //   otherUsers.map((user: any) => `${user.firstname} ${user.lastname}`).join(", ") ||
          //   "Unnamed Chat";

          return {
            id: chat._id,
            chatName: chat.users.firstName || "Unnamed Chat", // Use the names from chat.users
            latestMessage: chat.latestMessage?.content || "No messages yet",
            time: new Date(chat.latestMessage?.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            userPhoto:
              otherUsers[0]?.avatar || "https://via.placeholder.com/150", // Pick the first user's avatar or default
          };
        });

        setChatList(formattedChats);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="w-1/3 h-screen overflow-y-auto bg-white border-r">
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-orange-500">Connect</h2>
      </div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
        />
      </div>
      <div className="mt-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ul>
            {chatList.map((chat) => (
              <li
                key={chat.id}
                className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <img
                    src={chat.userPhoto}
                    alt={chat.chatName}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{chat.chatName}</p>
                    <p className="text-sm text-gray-500 truncate">{chat.latestMessage}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{chat.time}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;

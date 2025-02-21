import { useState, useRef, useEffect } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdMic } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { createMessage, MessagePayload } from "@/api/chat.api";
import { LoaderCircle } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { PiFilePdfBold, PiFileDocBold } from "react-icons/pi";
import { TbFileTypeDocx } from "react-icons/tb";
import { createGroupMessage, GroupMessagePayload } from "@/api/group-chat.api";

// is mobile hook
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

const ChatInput = ({
  chatId,
  reciverId,
  chatType,
}: {
  chatId: string;
  reciverId: string;
  chatType: "GROUP" | "DIRECT";
}) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileExtension, setFileExtension] = useState("");
  const [fileSize, setFileSize] = useState("");
  const docInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [showOptions, setShowOptions] = useState(false);

  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const handleSend = () => {
    if (message.trim() === "" && !previewImage) return;

    const payload: MessagePayload = {
      chatId: chatId,
      receiver: reciverId,
      content: message.trim(),
      // image: previewImage, // Include the image in the payload
    };

    const groupChatPayload: GroupMessagePayload = {
      message: message.trim(),
    };

    if (chatType === "DIRECT") {
      createMessageMutation.mutate(payload);
    } else {
      createGroupMessageMutation.mutate({
        groupId: chatId,
        payload: groupChatPayload,
      });
    }
    setMessage("");
    setPreviewImage(null);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setShowOptions(false);
      const extension = file.name.split(".").pop() || "";
      const fileSizeInKB = (file.size / 1024).toFixed(2);
      setFileExtension(extension);
      setFileSize(`${fileSizeInKB} KB`);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result as string);
          setIsModalOpen(true);
          setFileName(null);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("application/")) {
        setFileName(file.name);
        setIsModalOpen(true);

        setPreviewImage(null);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filePickerRef.current &&
        !filePickerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const createMessageMutation = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["message", chatId]);
    },
  });

  const createGroupMessageMutation = useMutation({
    mutationKey: ["createGroupMessage"],
    mutationFn: ({
      groupId,
      payload,
    }: {
      groupId: string;
      payload: GroupMessagePayload;
    }) => createGroupMessage(groupId, payload),
  });

  return (
    <>
      <div className="bg-gradient-to-b from-[#F8B36D] to-[#F28822] px-4 py-2 shadow-md sticky bottom-0 z-10 md:px-12 w-full ">
        <div className="flex items-center gap-2 px-2 bg-white rounded-full py-1  w-full">
          {/* Input Field */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 border-none rounded outline-none text-sm md:text-base w-0"
          />

          {/* Emoji Picker Button */}
          {!isMobile && (
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowEmojiPicker((pre) => !pre);
              }}
            >
              <FaRegSmile size={18} className="text-black" />
            </button>
          )}
          {showEmojiPicker && !isMobile && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-16 left-0 z-40 bg-white shadow-lg rounded-md sm:max-w-[90vw]  overflow-auto"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Attachment Options */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowOptions((prev) => !prev)}
              className="text-gray-500 hover:text-gray-700 mx-2"
            >
              <AiOutlinePaperClip size={18} className="text-black" />
            </button>

            {showOptions && (
              <div
                className="absolute bottom-14  z-40 right-0 bg-white shadow-lg rounded p-3"
                ref={filePickerRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    imageInputRef?.current && imageInputRef.current.click()
                  }
                  className="flex gap-2 items-center justify-center mb-2"
                >
                  <FaRegImage size={12} className="text-[#F1851B]" />
                  <span className="text-sm text-[#F1851B]">Photo</span>
                </button>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    docInputRef?.current && docInputRef.current.click()
                  }
                  className="flex gap-2 items-center justify-center"
                >
                  <GrDocumentText size={12} className="text-[#F1851B]" />
                  <span className="text-sm text-[#F1851B]">Document</span>
                </button>
                <input
                  type="file"
                  ref={docInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Send Button */}
          <button type="button" onClick={handleSend}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#F8B36D] to-[#F28822] flex items-center justify-center">
              {createMessageMutation.isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "1rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                <LuSendHorizontal size={20} className="text-white" />
              )}
            </div>
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] sm:max-h-[400px]">
          <DialogTitle className="text-lg">
            {fileName ? "Send File" : "Send Photo"}
          </DialogTitle>

          {/* Image Preview */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Uploaded Preview"
              className="w-full h-[200px] object-contain rounded-lg shadow-lg"
            />
          )}

          {fileName && (
            <div className="flex items-start gap-2">
              <div>
                {fileExtension === "pdf" && (
                  <PiFilePdfBold size={44} className="text-[#F28822]" />
                )}
                {fileExtension === "doc" && (
                  <PiFileDocBold size={44} className="text-[#F28822]" />
                )}
                {fileExtension === "docx" && (
                  <TbFileTypeDocx size={44} className="text-[#F28822]" />
                )}
              </div>
              <div>
                <p className="text-base font-bold pb-1">{fileName}</p>
                <p className="text-xs">{fileSize}</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 border px-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="bg-[#F28822] hover:bg-[#ff9027] text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInput;

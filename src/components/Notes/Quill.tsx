import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { Button } from "../ui/button";
// import { FaArrowLeft } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";
// import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HexColorPicker } from "react-colorful";
import { hexToInt } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderInterface } from "@/Pages/Journal";
import { FaFolderOpen } from "react-icons/fa6";
import { IoColorPalette } from "react-icons/io5";

interface NewJournalInf {
  title: string;
  content: string;
  color?: string;
  folderId?: string;
}

const QuillEditor = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [color, setColor] = useState("#ffffff");
  const [folder, setFolder] = useState<string | undefined>(undefined);

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsColorPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isLoading, mutate } = useMutation(
    (data: NewJournalInf) => axios.post("/api/v1/journals", data),
    {
      onSuccess(data) {
        toast.success("Journal Added Successfuly");
        setContent("");
        setTitle("");
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error adding journal"
        );
      },
    }
  );
  const { data: folders } = useQuery<{ data: FolderInterface[] | undefined }>(
    "getfolders",
    () => axios.get("/api/v1/folders"),
    {
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string" ? err.response?.data : "Error"
        );
      },
    }
  );
  const handleSave = async () => {
    const intColor = hexToInt(color);
    if (title && content) {
      mutate({
        title,
        content,
        color: intColor?.toString(),
        folderId: folder,
      });
    } else {
      toast.error("Please provide a title and description.");
    }
  };
  return (
    <div className="bg-white  rounded-xl shadow-xl relative">
      <div className="py-3 px-4 w-full flex justify-between ">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 text-xl max-md:w-1/2 font-semibold placeholder-gray-600 placeholder:font-bold appearance-none bg-transparent border-none focus:outline-none"
          placeholder="Title..."
        />
        <Button
          onClick={() => handleSave()}
          className="font-bold  text-primary"
        >
          {isLoading ? (
            <LoaderCircle
              style={{
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
      <div className="flex items-center pr-4 justify-between">
        <div className="px-4">
          <Select onValueChange={(value) => setFolder(value)} value={folder}>
            <SelectTrigger
              className={
                "!h-10 !py-4 border-none border-b-2 font-semibold placeholder-gray-600  text-lg !px-2"
              }
            >
              <SelectValue placeholder="Folder" />
            </SelectTrigger>
            <SelectContent>
              {folders?.data?.map((folder) => (
                <SelectItem key={folder._id} value={folder._id}>
                  <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-primary " /> {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs py-1 px-2">
            (Optional) If you'd like to organize your journal within a folder.
          </p>
        </div>
        <div className="relative">
          <IoColorPalette
            style={{ color: color === "#ffffff" ? "#000" : color }}
            className={`text-2xl md:text-4xl  cursor-pointer`}
            onClick={() => setIsColorPickerOpen((pre) => !pre)}
          />
          {isColorPickerOpen && (
            <div
              className="absolute top-2 right-8 bg-white rounded-md"
              ref={divRef}
            >
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
      </div>

      <ReactQuill
        className="h-[68vh]  border-none"
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default QuillEditor;

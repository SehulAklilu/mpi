import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CiEdit } from "react-icons/ci";
import { JournalCardProps, journalColors } from "./JournalCard";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaFolderOpen } from "react-icons/fa6";
import { IoColorPalette } from "react-icons/io5";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HexColorPicker } from "react-colorful";
import { hexToInt, intToHex } from "@/lib/utils";
import { FolderInterface } from "@/Pages/Journal";

const EditNote = ({ note }: { note: JournalCardProps }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(intToHex(note?.color));
  const [folder, setFolder] = useState<string | undefined>(note?.folderId?._id);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const queryClient = useQueryClient();
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

  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = useMutation(
    (data: any) => axios.patch(`/api/v1/journals/${note._id}`, data),
    {
      onSuccess(data) {
        toast.success("Journal Added Successfuly");
        queryClient.invalidateQueries("journals");
        setOpen(false);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to update this journal"
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

  const handleSave = () => {
    const newColor = hexToInt(color);
    if (title && title !== "" && content && content !== "") {
      mutate({ title, content, color: newColor?.toString() });
    } else {
      toast.error("Please provide a title and description.");
    }
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-semibold p-1 rounded-xl"
          onClick={(event) => {
            setOpen(true);
            event.stopPropagation();
          }}
        >
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        forceMount
        className="min-h-[90vh]  bg-gray-100 h-[90vh] md:min-w-[70%] overflow-y-auto"
      >
        <AlertDialogHeader>
          <div className="flex justify-between w-full">
            <AlertDialogTitle>Edit Your Note</AlertDialogTitle>
            <Button
              onClick={(event) => {
                setOpen(false);
                event.stopPropagation();
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>
          <AlertDialogDescription className="text-left">
            Modify the details of your note and save your changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="  rounded-xl shadow-xl">
          <div className="py-3 md:px-4 w-full flex justify-between">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 text-xl font-semibold placeholder-gray-600 placeholder:font-bold appearance-none bg-transparent border-none focus:outline-none"
              placeholder="Title..."
            />
            <Button
              onClick={() => handleSave()}
              className="font-bold text-primary"
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
              <Select
                onValueChange={(value) => setFolder(value)}
                value={folder}
              >
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
                (Optional) If you'd like to organize your journal within a
                folder.
              </p>
            </div>
            <div className="relative">
              <IoColorPalette
                style={{ color: color }}
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
            className="h-[40vh]  border-none  overflow-auto"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditNote;

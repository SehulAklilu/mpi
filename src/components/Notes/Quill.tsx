import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { Button } from "../ui/button";
// import { FaArrowLeft } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";
// import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface NewJournalInf {
  title: string;
  content: string;
}

const QuillEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isLoading, mutate } = useMutation(
    (data: NewJournalInf) => axios.post("/api/v1/journals", data),
    {
      onSuccess(data) {
        console.log(data, "Journals");
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
  const handleSave = async () => {
    mutate({
      title,
      content,
    });
  };
  return (
    <div className="bg-white  rounded-xl shadow-xl">
      <div className="py-3 px-4 w-full flex justify-between ">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 text-xl max-md:w-1/2 font-semibold placeholder-gray-600 placeholder:font-bold appearance-none bg-transparent border-none focus:outline-none"
          placeholder="Title..."
        />
        <Button onClick={() => handleSave()} className="font-bold  text-primary">
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
      <ReactQuill
        className="h-[66vh]  border-none"
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default QuillEditor;

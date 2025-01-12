import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { journalColors } from "@/components/Notes/JournalCard";
import QuillEditor from "./Quill";

interface NewJournalInf {
  title: string;
  content: string;
  color: string;
}

const NewJournal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(0);
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
      color: color.toString(),
    });
  };

  return (
    // <div className="flex gap-2 w-full">
    //   <Link
    //     to={"/journal"}
    //     className=" bg-primary my-5 w-8 h-8 rounded-full flex"
    //   >
    //     <FaArrowLeft className="m-auto text-white" />
    //   </Link>
    //   <div className="flex-1 flex flex-col gap-4 p-4 max-w-xl  font-raleway">
    //     <input
    //       type="text"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       className="p-2 text-xl font-semibold placeholder-gray-600 placeholder:font-bold appearance-none bg-transparent border-none focus:outline-none"
    //       placeholder="Title..."
    //     />

    //     <textarea
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //       className="p-2 text-lg appearance-none bg-transparent border-none w-full focus:outline-none"
    //       placeholder="Write your journal entry here"
    //     />
    //     <div className="mt-5 mb-12">
    //       <div className="flex gap-4">
    //         {journalColors.map((col, ind) => (
    //           <div
    //             role="button"
    //             onClick={() => setColor(ind)}
    //             style={{ backgroundColor: col.color }}
    //             className={`w-6 h-6 rounded-full ${
    //               color == ind && "border-2 border-primary"
    //             }`}
    //           ></div>
    //         ))}
    //       </div>
    //     </div>

    //     <Button
    //       // disabled={title.trim().length > 1 && content.trim().length > 1}
    //       onClick={() => handleSave()}
    //       className="flex max-w-32 bg-primary py-2 shadow rounded-3xl items-center justify-center gap-2  text-white border border-gray-300 "
    //     >
    //       {isLoading ? (
    //         <LoaderCircle
    //           style={{
    //             animation: "spin 1s linear infinite",
    //           }}
    //         />
    //       ) : (
    //         "Submit"
    //       )}
    //     </Button>
    //   </div>
    // </div>
    <QuillEditor />
  );
};

export default NewJournal;

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
import { ContentLayout } from "../Sidebar/contenet-layout";

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
    <ContentLayout>
      <div className="px-2 pt-12 min-h-screen">
        <QuillEditor />
      </div>
    </ContentLayout>
  );
};

export default NewJournal;

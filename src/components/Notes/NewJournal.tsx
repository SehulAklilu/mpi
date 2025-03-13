import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { Link, useSearchParams } from "react-router-dom";
import { journalColors } from "@/components/Notes/JournalCard";
import QuillEditor from "./Quill";
import { ContentLayout } from "../Sidebar/contenet-layout";

interface NewJournalInf {
  title: string;
  content: string;
  color: string;
}

const NewJournal: React.FC = () => {
  return (
    <ContentLayout>
      <div className="px-2 pt-4 min-h-screen">
        <QuillEditor />
      </div>
    </ContentLayout>
  );
};

export default NewJournal;

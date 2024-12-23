import React, { useState } from "react";
import axios from "axios";

const NewJournal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.post("http://194.5.159.228:3000/api/v1/journals", {
        title,
        content,
      });
      if (response.status === 200) {
        alert("Journal entry saved successfully!");
        setTitle("");
        setContent("");
      } else {
        alert("Failed to save journal entry.");
      }
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto font-raleway">
      <label className="text-sm font-semibold text-gray-700">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter title here"
      />
      
      <label className="text-sm font-semibold text-gray-700">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Write your journal entry here"
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NewJournal;

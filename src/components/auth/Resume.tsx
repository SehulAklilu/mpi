import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { FaGlobe } from "react-icons/fa";

function Resume({ setCurr }: any) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 5,
  });

  const handleUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center my-4">
          <div className="text-3xl font-semibold mt-4">Upload Resume</div>
          <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
            Let us review if Mindsight is the place for you
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-2xl mx-auto bg-white">
        <div
          {...getRootProps({
            onClick: (e) => {
              if (files.length > 0) {
                e.stopPropagation(); // Prevents unnecessary file chooser trigger
              }
            },
          })}
          className={`border-2 min-h-[40vh] bg-[#F0F0FF] flex items-center justify-center border-dashed rounded-md p-4 cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} id="fileInput" />
          <div className="text-center">
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between border rounded-md bg-gray-200 p-2 text-sm w-32"
                  >
                    <p className="truncate">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.name)}
                      className="ml-2 text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2">
                  <FiUploadCloud size={34} />
                  <p>Upload Resume</p>
                </div>

                <p>
                  Drag a File to this space or{" "}
                  <span className="text-primary cursor-pointer">
                    Click to Pick from File Explorer
                  </span>{" "}
                </p>
              </div>
            )}
            <p className="text-sm text-gray-400">You can add multiple files</p>
          </div>
        </div>
        <div>
          <div className="flex mt-1 flex-col space-y-2 w-full max-w-sm">
            <label
              htmlFor="website"
              className="text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <div className="flex items-center bg-violet-50 rounded-full bg-[#F0F0FF] px-2 py-2 shadow-sm">
              <FaGlobe className="h-5 w-5 text-orange-500 mr-2" />
              <input
                type="url"
                id="website"
                placeholder="https://www.example.com"
                className="flex-1 bg-transparent text-gray-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <Button className="px-7 py-2 mt-4 w-[200px] mx-auto shadow rounded-3xl bg-primary text-white">
        Continue
      </Button>
    </>
  );
}

export default Resume;

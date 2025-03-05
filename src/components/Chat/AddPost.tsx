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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { IoCloseSharp } from "react-icons/io5"
import { CiEdit } from "react-icons/ci"
import "react-quill/dist/quill.snow.css"
import { FaX } from "react-icons/fa6"
import { Input } from "../ui/input"
import { IoCloudUploadOutline } from "react-icons/io5"
import TextArea from "../Inputs/TextArea"
import { Textarea } from "../ui/textarea"
import { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { X } from "lucide-react"
import axiosInstance from "@/api/axios"
import Cookies from "js-cookie"

interface ImageFile {
  file: File
  preview: string
}

const AddPost = () => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [content, setContent] = useState<string>("")
  const images_ = images.map((item) => item.file)
  const [isOpen, setIsOpen] = useState(false)

  console.log(images_)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prevImages) => [...prevImages, ...newImages])
  }, [])

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  })

  const PostContent = async () => {
    try {
      const formData = new FormData()

      formData.append("content", content)
      formData.append("location", "Hamburg")
      images.forEach((image) => {
        formData.append("photos", image.file)
      })

      const response = await axiosInstance.post("/api/v1/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsOpen(false)

      console.log(response)
    } catch (error) {
      console.error("Error posting content:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 bg-primary rounded-full flex items-center"
      >
        <CiEdit className="text-2xl text-white m-auto" />
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[90vh] text-sm bg-white h-[90vh] min-w-[50%] overflow-auto flex flex-col">
        <div className="flex justify-between w-full ">
          <div className="w-fit font-semibold text-lg">Create a Post</div>
          <AlertDialogCancel className="border p-1 w-fit">
            <FaX />
          </AlertDialogCancel>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 flex-col">
            <div>Say Something</div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />
          </div>
          <div
            {...getRootProps()}
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            <p className="text-center text-gray-500">
              Drag & drop images here, or click to select files
            </p>
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={PostContent}
            className="bg-primary py-2 text-lg text-white rounded-full w-full"
          >
            Post
          </Button>
          <AlertDialogCancel className="border p-2 w-full rounded-full">
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddPost

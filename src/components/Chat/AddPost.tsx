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
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import "react-quill/dist/quill.snow.css";
import { FaX } from "react-icons/fa6";
import { Input } from "../ui/input";
import { IoCloudUploadOutline } from "react-icons/io5";
const AddPost = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-12 h-12 bg-primary rounded-full flex items-center">
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
            <div>Post Title</div>
            <Input
              placeholder="Match Announcement"
              className="w-full rounded-full"
            />
          </div>
          <div className="flex gap-1 flex-col">
            <div>Post Title</div>
            <Input
              placeholder="Description..."
              className="w-full rounded-full"
            />
          </div>
          <div>
            <div>Media</div>
            <div className="w-full h-[200px] border bg-blue-100/50 rounded flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-2">
                <IoCloudUploadOutline />
                <div>Upload Media</div>
              </div>
              <div>
                Drag images/video to this space or{" "}
                <span className="text-primary">
                  Click to Pick from File Explorer
                </span>
              </div>
              <div>You can add multiple FIles</div>
            </div>
          </div>
          <Button className="bg-primary py-2 text-lg text-white rounded-full w-full">
            Post
          </Button>
          <AlertDialogCancel className="border p-2 w-full rounded-full">
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPost;

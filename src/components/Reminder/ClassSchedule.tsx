import { ClassesSchedul } from "@/types/classes.type";
import React, { useState } from "react";
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { TbChecklist } from "react-icons/tb";
import { useRole } from "@/RoleContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { extractDateTime } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import TextArea from "../Inputs/TextArea";
import { Textarea } from "../ui/textarea";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaCheck } from "react-icons/fa";

function ClassSchedule({ classSchedule }: { classSchedule: ClassesSchedul }) {
  const { role } = useRole();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(classSchedule.playerNote);
  const [openEdit, setOpenEdit] = useState(false);
  const userId = Cookies.get("user_id");
  const [coachNote, seCoachtNote] = useState("");

  const queryClient = useQueryClient();

  const updateClassSchedule = useMutation(
    ({ id, data }: { id: string; data: any }) =>
      axiosInstance.patch(`/api/v1/class-schedule/${id}`, data),
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        queryClient.invalidateQueries("classes-schedule");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const updateCoachSchedule = useMutation(
    ({ id, data }: { id: string; data: any }) =>
      axiosInstance.patch(`/api/v1/class-schedule/${id}/coach-response`, data),
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        queryClient.invalidateQueries("classes-schedule");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const deleteClassSchedule = useMutation(
    ({ id }: { id: string }) =>
      axiosInstance.delete(`/api/v1/class-schedule/${id}`),
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        queryClient.invalidateQueries("classes-schedule");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  return (
    <>
      <div
        className={`max-md:w-full w-[90%] relative ml-auto text-sm px-2 py-3 rounded-lg bg-blue-100/20  hover:shadow duration-200 border border-gray-200 flex flex-col cursor-pointer`}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <FaRegCalendarAlt className="text-2xl mt-1 text-primary " />
          <div>
            <p className="text-lg font-semibold">
              {classSchedule.coachId.firstName} {classSchedule.coachId.lastName}
            </p>
            {/* <p>{classSchedule.to}</p> */}
            <p>{classSchedule.playerNote}</p>
            <div className="flex flex-wrap gap-4 my-2">
              <Button
                className="px-3 py-2 max-md:px-2 max-md:py-1  bg-primary/10 flex  rounded text-primary"
                onClick={() => setIsOpen(true)}
              >
                <div className=" w-5 h-5 rounded-full flex">
                  <TbChecklist className="m-auto text-lg" />
                </div>
                <div className="my-auto">View Detail</div>
              </Button>
              {classSchedule.userId._id == userId && (
                <>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenEdit(true);
                      // onEditClicked();
                      // setInitialClassData(session);
                    }}
                    className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-white text-blue-500 flex gap-2 rounded "
                  >
                    <div className="w-5 h-5 rounded-full flex">
                      <FaEdit className="m-auto" />
                    </div>
                    <div className="my-auto">Edit</div>
                  </Button>

                  <Button
                    onClick={() => setOpenDeleteAlert(true)}
                    className="px-3 py-2 text-red-800 bg-red-500/20 flex gap-2 rounded "
                  >
                    <div className="w-5 h-5 rounded-full flex">
                      <RiDeleteBin6Line className="m-auto" />
                    </div>
                    <div className="my-auto">Delete</div>
                  </Button>
                </>
              )}
              {role === "coach" && classSchedule.status === "pending" && (
                <>
                  <Button
                    onClick={() => setOpenDeleteAlert(true)}
                    className="px-3 py-2 text-red-800 bg-red-500/20 flex gap-2 rounded "
                  >
                    <div className="w-5 h-5 rounded-full flex">
                      <RiDeleteBin6Line className="m-auto" />
                    </div>
                    <div className="my-auto">Reject</div>
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenEdit(true);
                    }}
                    className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-green-700 text-white flex gap-2 rounded "
                  >
                    <div className="w-5 h-5 rounded-full flex">
                      <FaCheck className="m-auto" />
                    </div>
                    <div className="my-auto">Accept</div>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="absolute top-2 text-xs right-4">
            {extractDateTime(classSchedule.date)?.date}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className=" w-[98%] md:max-w-[80vw] max-h-[90%] bg-white rounded-lg overflow-y-auto shadow-lg p-6 space-y-4">
          <DialogTitle className=" flex justify-between items-center font-semibold text-primary">
            <h1 className="text-2xl">Schedule Information </h1>
            <button className="py-2 px-4 rounded-full lg:mr-8 bg-primary text-white capitalize">
              {classSchedule.status}
            </button>
          </DialogTitle>
          <div>
            <label>Date</label>
            <h1 className="text-xl font-semibold">
              {extractDateTime(classSchedule.date)?.date}
            </h1>
          </div>

          <div>
            <label>Time</label>
            <h1 className="text-xl font-semibold">
              {extractDateTime(classSchedule.date)?.time}
            </h1>
          </div>

          <div>
            <label>Coach</label>
            <h1 className="text-xl font-semibold">
              {classSchedule.coachId.firstName} {classSchedule.coachId.lastName}
            </h1>
          </div>

          <div>
            <label>Player Note</label>
            <h1 className="text-xl font-semibold">
              {classSchedule.playerNote}
            </h1>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent className="w-[90%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {role === "coach" ? (
                <Textarea
                  value={coachNote}
                  onChange={(e) => seCoachtNote(e.target.value)}
                  placeholder="Add your note here..."
                />
              ) : (
                "Are you sure you want to delete this class schedule?"
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border rounded-lg py-2 px-4">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 items-center justify-center flex gap-2 text-white rounded-lg py-2 px-4"
              onClick={() => {
                if (role === "coach") {
                  return updateCoachSchedule.mutate({
                    id: classSchedule._id,
                    data: { status: "rejected" },
                  });
                } else {
                  deleteClassSchedule.mutate({ id: classSchedule._id });
                }
              }}
            >
              Continue
              {(deleteClassSchedule.isLoading ||
                updateCoachSchedule.isLoading) && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* edit note */}
      <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
        <AlertDialogContent className="w-[90%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {role === "coach" ? "Accept" : "Update Note"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {role === "coach" ? (
                <Textarea
                  value={coachNote}
                  onChange={(e) => seCoachtNote(e.target.value)}
                  placeholder="Add your note here..."
                />
              ) : (
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add your note here..."
                />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border rounded-lg py-2 px-4">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 items-center justify-center flex gap-2 text-white rounded-lg py-2 px-4"
              onClick={() => {
                if (role === "coach") {
                  updateCoachSchedule.mutate({
                    id: classSchedule._id,
                    data: { status: "accepted" },
                  });
                } else {
                  updateClassSchedule.mutate({
                    id: classSchedule._id,
                    data: { playerNote: note },
                  });
                }
              }}
            >
              {role == "coach" ? "Submit" : "Update"}
              {(updateClassSchedule.isLoading ||
                updateCoachSchedule.isLoading) && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ClassSchedule;

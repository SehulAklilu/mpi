import { extractDateTime } from "@/lib/utils";
import { CheckList, PreSessionQuestions, Session } from "@/types/classes.type";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { MdModeEdit } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MdCancel } from "react-icons/md";
import { FaChevronUp, FaChevronDown, FaCalendarDay } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import AddCoachEvaluation from "./AddCoachEvaluation";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useRole } from "@/RoleContext";
import PlayerClassDialog from "./PlayerClassDialog";
import { FaCircleCheck } from "react-icons/fa6";

function SessionCard({ session }: { session: Session }) {
  const { role } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [feedBack, setFeedBack] = useState(false);
  const [uploadVideo, setUploadVideo] = useState(false);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [preGameAssessment, setPreGameAssessment] = useState(false);
  const [evaluationSummary, setEvaluationSummary] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );
  const [canReflect, setCanReflect] = useState(
    session.playersCanReflect ?? false
  );
  const [selectedPlayerStatus, setSelectedPlayerStatus] = useState<
    string | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const status = [
    { label: "Active", value: "activate" },
    { label: "Completed", value: "complete" },
    { label: "Cancelled", value: "cancel" },
  ];

  const playerStatusList = [
    { label: "Present", value: "present" },
    { label: "Absent", value: "absent" },
    { label: "Pending", value: "aending" },
    { label: "Late", value: "late" },
    { label: "Excused", value: "excused" },
  ];

  const [uploadImage, setUploadImage] = useState(false);
  const [listOfStudents, setListOfStudents] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  ///// API Requests
  const updateStatus = useMutation(
    async () => {
      if (!selectedStatus) {
        throw new Error("Please select a valid status");
      }
      return axiosInstance.patch(
        `api/v1/classes/${session._id}/${selectedStatus}`
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const playerCanReflect = useMutation(
    () =>
      axiosInstance.patch(`api/v1/classes/${session._id}/playersCanReflect`),
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        setCanReflect(response.data.playerCanReflect);
        toast.success(message);
        // queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const updatePlayersStatus = useMutation(
    async (playerId: string) => {
      if (!selectedPlayerStatus) {
        throw new Error("Please select a valid status");
      }
      return axiosInstance.patch(
        `api/v1/classes/${session._id}/players/${playerId}`,
        { status: selectedPlayerStatus }
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // queryClient.invalidateQueries("reminders");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const uploadImageMu = useMutation(
    async () => {
      if (!imageFiles || imageFiles.length === 0) {
        throw new Error("Please select images");
      }

      // Create FormData
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append("photos", file);
      });

      return axiosInstance.post(
        `/api/v1/classes/${session._id}/classPhotos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // queryClient.invalidateQueries("reminders");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const uploadVideoMu = useMutation(
    async () => {
      if (!videoFiles || videoFiles.length === 0) {
        throw new Error("Please select videos");
      }

      // Create FormData
      const formData = new FormData();
      videoFiles.forEach((file) => {
        formData.append("videos", file);
      });

      return axiosInstance.post(
        `/api/v1/classes/${session._id}/classVideos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // Optionally invalidate queries if needed
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleImageUploadSubmit = () => {
    // Implement image upload logic here, like sending the files to the server
    console.log("Images uploaded:", imageFiles);
    setUploadImage(false);
  };

  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setVideoFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const renderScale = (value: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-4 h-4 flex items-center justify-center rounded-full text-white 
            ${num <= value ? "bg-primary" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    );
  };

  const removeVideo = (index: number) => {
    setVideoFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const getCheckList = (playerId: string): CheckList | undefined => {
    return session?.checkList?.find((list) => list.player._id === playerId);
  };

  const getPreSessionQuestions = (
    playerId: string
  ): PreSessionQuestions | undefined => {
    return session?.preSessionQuestions?.find(
      (list) => list.player._id === playerId
    );
  };

  const handleVideoUploadSubmit = () => {
    // Implement video upload logic here, like sending the files to the server
    console.log("Videos uploaded:", videoFiles);
    setUploadVideo(false);
  };

  return (
    <>
      <div
        className={`max-md:w-full w-[90%] ml-auto text-sm px-2 py-3 rounded-lg bg-blue-100/20  hover:shadow duration-200 border border-gray-200 flex flex-col cursor-pointer`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <FaCalendarDay />
          <p>
            {session.coach.firstName} {session.coach.lastName}
          </p>
          <p>{extractDateTime(session.date)?.date}</p>
          <p>{session.to}</p>
          <p>{session.levelPlan}</p>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full sm:w-[60rem] max-w-[80vw] max-h-[90%] bg-white rounded-lg overflow-y-auto shadow-lg p-6 space-y-6">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Session Detail
          </DialogTitle>
          {role && role === "player" ? (
            <PlayerClassDialog session={session} />
          ) : (
            <>
              <div className="grid grid-cols-2">
                {/* Session Type */}
                <div className="flex flex-col">
                  <span className="font-medium  text-lg">Session Type</span>
                  <span className="capitalize text-lg ">
                    {session.sessionType}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex flex-col">
                  <span className="font-medium  text-lg">Date & Time</span>
                  <span className="text-lg">
                    {extractDateTime(session.date)?.date} {session.to}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2">
                {/* Level Plan */}
                <div className="flex flex-col">
                  <span className="font-medium  text-lg">Level Plan</span>
                  <span className="capitalize  text-lg ">
                    {session.levelPlan}
                  </span>
                </div>

                {/* Player Can Reflect */}
                <div className="space-y-1">
                  <h3 className="font-medium  text-lg">Player Can Reflect</h3>
                  <p className="text-sm">
                    Whether the student can reflect on the session.
                  </p>
                  <Switch
                    checked={canReflect}
                    onCheckedChange={() => playerCanReflect.mutate()}
                    className="border border-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                {/* Status Update */}
                <div className=" w-[80%] ">
                  <div className="flex gap-4 justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-medium  text-lg">Status</span>
                      <span className="capitalize  text-lg">
                        {session.status}
                      </span>
                    </div>
                    <MdModeEdit
                      className="text-primary text-lg mt-2 cursor-pointer"
                      onClick={() => setEditStatus((pre) => !pre)}
                    />
                  </div>
                  {editStatus && (
                    <div className="space-y-4mt-4">
                      <Select
                        onValueChange={(value: any) => {
                          setSelectedStatus(value);
                        }}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {status.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={
                                type.value ?? session?.status?.toLowerCase()
                              }
                              className="capitalize"
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex justify-end gap-4">
                        <Button
                          className="border py-[0.1rem] px-2 rounded-md mt-1"
                          onClick={() => setEditStatus(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-primary flex gap-2 text-white py-[0.1rem] px-2 rounded-md mt-1"
                          onClick={() => updateStatus.mutate()}
                        >
                          Update
                          {updateStatus.isLoading && (
                            <LoaderCircle
                              style={{
                                animation: "spin 1s linear infinite",
                                fontSize: "2rem",
                                color: "#FFFFFF",
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Feedback */}
                <div className="w-[80%]">
                  <div className="flex   justify-between items-start">
                    <div className="flex  flex-col">
                      <span className="font-medium  text-lg">Feedback</span>
                      <span className="capitalize text-lg">
                        {session.feedback ?? "No Feedback Provided!"}
                      </span>
                    </div>
                    <MdModeEdit
                      className="text-lg text-primary mt-2  cursor-pointer"
                      onClick={() => setFeedBack((pre) => !pre)}
                    />
                  </div>
                  {feedBack && (
                    <div className="space-y-4 mt-4">
                      <Textarea
                        id="feedback"
                        autoFocus
                        placeholder="Enter Feedback"
                        className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                      />
                      <div className="flex justify-end gap-4">
                        <Button onClick={() => setFeedBack(false)}>
                          Cancel
                        </Button>
                        <Button>Save</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2">
                {/* Upload Session Photo */}
                <div className="w-[80%]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium  text-lg">
                        Upload Session Photo
                      </span>
                    </div>

                    <div onClick={() => setUploadImage((pre) => !pre)}>
                      {uploadImage ? (
                        <FaChevronUp className="text-lg text-primary cursor-pointer" />
                      ) : (
                        <FaChevronDown className="text-lg text-primary cursor-pointer" />
                      )}
                    </div>
                  </div>

                  {uploadImage && (
                    <div className="space-y-4 mt-4">
                      <div className="flex justify-center items-center w-full p-4 border-2 border-dashed border-gray-400 rounded-lg">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-gray-600 font-semibold"
                        >
                          Click to Select images
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      {/* Display Image Previews in a 2-column Grid */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />

                            <MdCancel
                              className="text-2xl absolute top-0 right-0 text-red-500"
                              onClick={() => removeImage(index)}
                            />
                          </div>
                        ))}
                        {session.photos?.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={photo}
                              alt="Preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button
                          onClick={() => setUploadImage(false)}
                          className="border py-[0.1rem] px-2 rounded-md mt-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => uploadImageMu.mutate()}
                          className="bg-primary flex gap-2 text-white py-[0.1rem] px-2 rounded-md mt-1"
                        >
                          Upload Image
                          {uploadImageMu.isLoading && (
                            <LoaderCircle
                              style={{
                                animation: "spin 1s linear infinite",
                                fontSize: "2rem",
                                color: "#FFFFFF",
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Session Video */}
                <div className="w-[80%]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium  text-lg">
                        Upload Session Video
                      </span>
                    </div>
                    <div onClick={() => setUploadVideo((pre) => !pre)}>
                      {uploadVideo ? (
                        <FaChevronUp className="text-lg text-primary cursor-pointer" />
                      ) : (
                        <FaChevronDown className="text-lg text-primary cursor-pointer" />
                      )}
                    </div>
                  </div>

                  {uploadVideo && (
                    <div className="space-y-4 mt-4">
                      <div className="flex justify-center items-center w-full p-4 border-2 border-dashed border-gray-400 rounded-lg">
                        <label
                          htmlFor="vedio-upload"
                          className="cursor-pointer text-gray-600 font-semibold"
                        >
                          Click to Select Videos
                        </label>
                        <input
                          id="vedio-upload"
                          type="file"
                          accept="video/*"
                          multiple
                          className="hidden"
                          onChange={handleVideoUpload}
                        />
                      </div>
                      {/* Display Video Previews in a 2-column Grid */}
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {videoFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <video
                              className="w-full h-24 object-cover rounded-lg"
                              controls
                            >
                              <source src={URL.createObjectURL(file)} />
                            </video>
                            <MdCancel
                              className="text-2xl absolute top-0 right-0 text-red-500"
                              onClick={() => removeVideo(index)}
                            />
                          </div>
                        ))}
                        {session.videos.map((video, index) => (
                          <div key={index} className="relative">
                            <video
                              className="w-full h-24 object-cover rounded-lg"
                              controls
                            >
                              <source src={video} />
                            </video>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button
                          onClick={() => setUploadVideo(false)}
                          className="border py-[0.1rem] px-2 rounded-md mt-1"
                        >
                          Cancel
                        </Button>

                        <Button
                          onClick={() => uploadVideoMu.mutate()}
                          className="bg-primary flex gap-2 text-white py-[0.1rem] px-2 rounded-md mt-1"
                        >
                          Upload Video
                          {uploadVideoMu.isLoading && (
                            <LoaderCircle
                              style={{
                                animation: "spin 1s linear infinite",
                                fontSize: "2rem",
                                color: "#FFFFFF",
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-[90%]">
                <div className="flex gap-4 justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-medium  text-lg">
                      List of Students
                    </span>
                  </div>
                  <div onClick={() => setListOfStudents((pre) => !pre)}>
                    {listOfStudents ? (
                      <FaChevronUp className="text-lg text-primary cursor-pointer" />
                    ) : (
                      <FaChevronDown className="text-lg text-primary cursor-pointer" />
                    )}
                  </div>
                </div>
                {listOfStudents && (
                  <div className="border p-2 rounded-xl">
                    {session?.attendance.map((att) => (
                      <>
                        <div className="grid grid-cols-2  gap-10">
                          <div className="flex items-center gap-2">
                            <img
                              src={att.player.avatar}
                              alt={att.player.firstName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h1 className="font-medium">
                                {att.player.firstName} {att.player.lastName}
                              </h1>
                              <p className="text-sm m-0 p-0">
                                <span>Status</span> :{" "}
                                <span className="capitalize">{att.status}</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between ">
                            <div className="w-full flex-grow">
                              {playerStatus && (
                                <div className="flex-1 ">
                                  <Select
                                    onValueChange={(value: any) => {
                                      setSelectedPlayerStatus(value);
                                    }}
                                  >
                                    <SelectTrigger className="h-10 w-full flex-1 flex-grow">
                                      <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {playerStatusList.map((type) => (
                                        <SelectItem
                                          key={type.value}
                                          value={
                                            type.value ??
                                            att?.status?.toLowerCase()
                                          }
                                          className="capitalize"
                                        >
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <div className="flex justify-end gap-4">
                                    <Button
                                      className="border py-[0.1rem] px-2 rounded-md mt-1"
                                      onClick={() => setPlayerStatus(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      className="bg-primary flex gap-2 text-white py-[0.1rem] px-2 rounded-md mt-1"
                                      onClick={() =>
                                        updatePlayersStatus.mutate(
                                          att.player._id
                                        )
                                      }
                                    >
                                      Update
                                      {updatePlayersStatus.isLoading && (
                                        <LoaderCircle
                                          style={{
                                            animation:
                                              "spin 1s linear infinite",
                                            fontSize: "2rem",
                                            color: "#FFFFFF",
                                          }}
                                        />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                            {session.status === "activate" && (
                              <MdModeEdit
                                className="text-xl  text-primary mt-2  cursor-pointer"
                                onClick={() => setPlayerStatus((pre) => !pre)}
                              />
                            )}
                          </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex items-start justify-between px-2">
                          <div>
                            <h1 className="text-lg font-medium">
                              Evaluation Summary
                            </h1>
                            <p className="text-sm">Add Summary here!</p>
                          </div>
                          {session.status === "complete" && (
                            <FaRegFileAlt
                              className="text-xl text-primary cursor-pointer"
                              onClick={() =>
                                setEvaluationSummary((pre) => !pre)
                              }
                            />
                          )}
                        </div>

                        <div>
                          {evaluationSummary && (
                            <AddCoachEvaluation
                              evaluations={session.evaluations}
                              playerId={att.player._id}
                              sessionId={session._id}
                            />
                          )}
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between items-center">
                          <h1 className="text-lg font-medium">
                            Pre-game Assessment
                          </h1>
                          <div
                            onClick={() => setPreGameAssessment((pre) => !pre)}
                          >
                            {listOfStudents ? (
                              <FaChevronUp className="text-lg text-primary cursor-pointer" />
                            ) : (
                              <FaChevronDown className="text-lg text-primary cursor-pointer" />
                            )}
                          </div>
                        </div>
                        {preGameAssessment && (
                          <div>
                            <h1 className="text-lg text-primary mt-2">
                              Completed Assessment (
                              <span className="text-sm px-2">
                                The student have selected
                              </span>
                              )
                            </h1>
                            <h1 className="text-sm"></h1>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div>
                                  <h1 className="font-medium underline">
                                    Pre Game Survey Results
                                  </h1>
                                  <div className="my-2 flex gap-2">
                                    Emotional State
                                    {renderScale(
                                      getPreSessionQuestions(att.player._id)
                                        ?.emotion || 0
                                    )}
                                  </div>
                                  <div className="my-2 flex gap-2">
                                    Energy Level
                                    {renderScale(
                                      getPreSessionQuestions(att.player._id)
                                        ?.energy || 0
                                    )}
                                  </div>
                                  <div className="my-2 flex gap-2">
                                    Engagement
                                    {renderScale(
                                      getPreSessionQuestions(att.player._id)
                                        ?.engagement || 0
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h1 className="font-medium underline">
                                  Pre Game Checklist Results
                                </h1>
                                <div className="my-2 flex gap-2">
                                  {getCheckList(att.player._id)?.survey ? (
                                    <FaCircleCheck className="text-lg text-green-700" />
                                  ) : (
                                    <MdCancel className="text-xl text-red-600" />
                                  )}
                                  Self Assessment Evaluation{" "}
                                </div>
                                <div className="my-2 flex gap-2">
                                  {getCheckList(att.player._id)?.mindfulness ? (
                                    <FaCircleCheck className="text-lg text-green-700" />
                                  ) : (
                                    <MdCancel className="text-xl text-red-600" />
                                  )}
                                  Quick Grounding Mindfulness Exercises
                                </div>
                                <div className="my-2 flex gap-2">
                                  {" "}
                                  {getCheckList(att.player._id)?.imagery ? (
                                    <FaCircleCheck className="text-lg text-green-700" />
                                  ) : (
                                    <MdCancel className="text-xl text-red-600" />
                                  )}
                                  Imagery Work
                                </div>
                                <div className="my-2 flex gap-2">
                                  {getCheckList(att.player._id)?.stretching ? (
                                    <FaCircleCheck className="text-lg text-green-700" />
                                  ) : (
                                    <MdCancel className="text-xl text-red-600" />
                                  )}
                                  Dynamic Stretching
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SessionCard;

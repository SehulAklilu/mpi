import { extractDateTime } from "@/lib/utils";
import { Session } from "@/types/classes.type";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { FaChevronUp, FaChevronDown, FaCalendarDay } from "react-icons/fa";

import { Button } from "../ui/button";
import { CheckCheck, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import RatingProgressBar from "../RingProgressBar";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Cookies from "js-cookie";
import { PlayerSession } from "@/types/session.type";
import { getUserProfile } from "@/api/auth.api";
import PlayerEvaluation from "./PlayerEvaluation";
import PostMatchPlayerReflection from "./PostMatchPlayerReflection";
import audio from "../../assets/audio/mindfullness.mp3";
import image from "../../assets/quick-mindfulness-tricks.webp";

function PlayerClassDialog({ session }: { session: Session }) {
  const playerSession = session as unknown as PlayerSession;
  const [editStatus, setEditStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [preGameCheckList, setPreGameCheckList] = useState(false);
  const [selfAssessment, setSelfAssessment] = useState(false);
  const [mindfulnessExercises, setMindfulnessExercises] = useState(false);
  const [playerEvaluation, setPlayerEvaluation] = useState(false);
  const [playerReflection, setPlayerReflection] = useState(false);
  const [additioalNote, setAdditionalNote] = useState("");
  const [stretching, setStretching] = useState(
    playerSession.checkList.stretching
  );
  const [imagery, setImagery] = useState(playerSession.checkList.imagery);
  const [reason, setReason] = useState<string | undefined>(undefined);
  const status = [
    { label: "Confirmed", value: "confirmed" },
    { label: "Rejected", value: "rejected" },
    { label: "Pending", value: "pending" },
  ];
  const queryClient = useQueryClient();

  const questions = [
    {
      no: 1,
      question: "How would you rate your current emotional state?",
      formKey: "emotion",
      label: [
        "Very negative",
        "Somewhat negative",
        "Neutral",
        "Somewhat positive",
        "Very positive",
      ],
    },
    {
      no: 2,
      question: "How would you rate current energy state?",
      formKey: "energy",
      label: ["Extremely low", "Low", "Moderate", "High", "Extremely high"],
    },
    {
      no: 3,
      question: "How engaged do you feel right now, before you session?",
      formKey: "engagement",
      label: [
        "Not at all present",
        "A Little present",
        "Moderately present",
        "Very present",
        "Completely present",
      ],
    },
  ];

  const handleRatingChange = (formKey: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: value,
    }));
  };

  const [formData, setFormData] = useState(
    Object.fromEntries(questions.map((q) => [q.formKey, 0])) // Default all values to 1
  );

  const updateStatus = useMutation(
    async () => {
      if (!selectedStatus && selectedStatus === "rejected" && !reason) {
        throw new Error("Please select a valid status");
      }
      return axiosInstance.patch(
        `api/v1/classes/${playerSession._id}/availability`,
        {
          response: selectedStatus,
          reason: reason,
        }
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const preSessionQuestions = useMutation(
    async () => {
      if (!additioalNote && !formData) {
        throw new Error("Please select a valid status");
      }
      return axiosInstance.post(
        `api/v1/classes/${playerSession._id}/addPreSessionQuestions`,
        { ...formData, additionalInfo: additioalNote }
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const checkList = useMutation(
    (type: string) =>
      axiosInstance.patch(
        `api/v1/classes/${playerSession._id}/checkList/${type}`
      ),
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        setStretching(response?.data?.checkList?.stretching);
        setImagery(response?.data?.checkList?.setImagery);
        queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );

  const handleAudioEnd = () => {
    checkList.mutate("mindfulness");
  };

  const { data: user } = useQuery("userProfile", getUserProfile);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
        {/* Session Type */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />

            <span className="capitalize text-xl ">
              {user?.firstName} {user?.lastName}
              <p className="text-sm">{user?.emailAddress?.email}</p>
            </span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col">
          <span className="font-medium  text-primary">Date & Time</span>
          <span className="text-lg">
            {extractDateTime(playerSession.date)?.date} {playerSession.to}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
        {/* Session Type */}
        <div className="flex flex-col">
          <span className="font-medium  text-primary">Session Type</span>
          <span className="capitalize text-lg ">
            {playerSession.sessionType}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col">
          <span className="font-medium  text-primary">Level Plan</span>
          <span className="text-lg">{playerSession.levelPlan}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
        {/* Session Type */}
        <div className="flex flex-col">
          <span className="font-medium  text-primary">Status</span>
          <span className="capitalize  text-lg">{playerSession.status}</span>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col">
          <span className="font-medium  text-primary">Feedback</span>
          <span className="text-lg">
            {playerSession.feedback ?? "No Feedback"}
          </span>
        </div>
      </div>

      {playerSession.status !== "completed" ? (
        <div className="">
          <div className="flex flex-col">
            <div className="font-medium flex gap-4 items-center  text-primary">
              Attendance Responce
              <MdModeEdit
                className="text-primary text-lg  cursor-pointer"
                onClick={() => setEditStatus((pre) => !pre)}
              />
            </div>
            <span className="capitalize  text-lg">
              {playerSession.attendanceResponse}
            </span>
          </div>
          {editStatus && (
            <div className="space-y-4 w-full sm:w-[50%] mt-4">
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
                      value={type.value ?? playerSession?.status?.toLowerCase()}
                      className="capitalize"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStatus === "rejected" && (
                <Textarea
                  id="feedback"
                  autoFocus
                  placeholder="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-white border border-gray-300 my-2 rounded-lg p-2 w-full"
                />
              )}
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
          <div className="flex flex-col my-4">
            <span className="font-medium  text-primary">Reason</span>
            <span className="text-lg">{playerSession.reason}</span>
          </div>

          <hr className="my-4 border-2" />

          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-primary">
              Pre Game Checklist
            </h1>
            <div onClick={() => setPreGameCheckList((pre) => !pre)}>
              {preGameCheckList ? (
                <FaChevronUp className="text-lg text-primary cursor-pointer" />
              ) : (
                <FaChevronDown className="text-lg text-primary cursor-pointer" />
              )}
            </div>
          </div>
          {preGameCheckList && (
            <div className="flex flex-col">
              <div>
                <div
                  className="flex justify-between items-center my-2"
                  onClick={() => setSelfAssessment((pre) => !pre)}
                >
                  <h1 className="font-medium">Self Assessment Evaluation</h1>
                  <div className="flex gap-4 items-center">
                    <Checkbox
                      disabled
                      checked={playerSession.checkList.survey ?? false}
                    />
                    <div>
                      {selfAssessment ? (
                        <FaChevronUp className="text-lg text-primary cursor-pointer" />
                      ) : (
                        <FaChevronDown className="text-lg text-primary cursor-pointer" />
                      )}
                    </div>
                  </div>
                </div>
                {selfAssessment && (
                  <div>
                    <h1>Pre Game Survery</h1>
                    {questions.map((question) => (
                      <div key={question.no} className="mb-6">
                        <h2 className="text-lg font-medium text-gray-800">
                          {question.no}, {question.question}
                        </h2>
                        <div className="mt-3 ">
                          <RatingProgressBar
                            value={formData[question.formKey]}
                            onChange={(value) =>
                              handleRatingChange(question.formKey, value)
                            }
                            useAlternativeLabels={false}
                            customLabel={question.label}
                          />
                        </div>
                      </div>
                    ))}
                    <Textarea
                      id="feedback"
                      autoFocus
                      placeholder="Additional Notes"
                      value={additioalNote}
                      onChange={(e) => setAdditionalNote(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <button
                      className="py-2 px-4 mt-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 flex items-center justify-center "
                      onClick={() => preSessionQuestions.mutate()}
                    >
                      <span> Submit Survey</span>
                      {preSessionQuestions.isLoading && (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div>
                <div
                  className="flex justify-between items-center my-2"
                  onClick={() => setMindfulnessExercises((pre) => !pre)}
                >
                  <h1 className="font-medium ">
                    Quick Grounding Mindfulness Exercises
                  </h1>

                  <div className="flex gap-4 items-center">
                    <Checkbox
                      disabled
                      checked={playerSession.checkList.mindfulness ?? false}
                    />
                    <div>
                      {mindfulnessExercises ? (
                        <FaChevronUp className="text-lg text-primary cursor-pointer" />
                      ) : (
                        <FaChevronDown className="text-lg text-primary cursor-pointer" />
                      )}
                    </div>
                  </div>
                </div>
                {mindfulnessExercises && (
                  <div className="min-h-[10rem] relative">
                    <div className="h-[10rem]">
                      <img
                        src={image}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <audio
                      controls
                      onEnded={handleAudioEnd}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 border-4 rounded-full border-primary -translate-y-1/2"
                    >
                      <source src={audio} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                    {/* {isFinished && <p>Audio finished. API request sent.</p>} */}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center my-2">
                <div>
                  <h1 className="font-medium ">
                    Imagery Work (
                    <span className="text-xs">
                      Can be done while traveling to practice or before session
                    </span>
                    ){" "}
                  </h1>
                </div>

                <Checkbox
                  checked={imagery}
                  className="mr-8"
                  onCheckedChange={() => checkList.mutate("imagery")}
                />
              </div>
              <div className="flex justify-between items-center my-2">
                <h1 className="font-medium ">Dynamic Stretching</h1>
                <Checkbox
                  checked={stretching}
                  className="mr-8"
                  onCheckedChange={() => checkList.mutate("stretching")}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}

      <hr className="my-4 border-2" />

      <div>
        {playerSession?.playersCanReflect &&
          playerSession.status === "completed" && (
            <>
              <div className="flex justify-between items-center my-4">
                <h1 className="text-lg font-bold text-primary">
                  Player Evaluation
                </h1>
                <div onClick={() => setPlayerEvaluation((pre) => !pre)}>
                  {playerEvaluation ? (
                    <FaChevronUp className="text-lg text-primary cursor-pointer" />
                  ) : (
                    <FaChevronDown className="text-lg text-primary cursor-pointer" />
                  )}
                </div>
              </div>
              <div>
                {playerEvaluation && (
                  <PlayerEvaluation session={playerSession} />
                )}
              </div>
              <hr className="my-4 border-2" />
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold text-primary">
                  Player Reflection PRIM
                </h1>
                <div onClick={() => setPlayerReflection((pre) => !pre)}>
                  {playerReflection ? (
                    <FaChevronUp className="text-lg text-primary cursor-pointer" />
                  ) : (
                    <FaChevronDown className="text-lg text-primary cursor-pointer" />
                  )}
                </div>
              </div>
              <div>
                {playerReflection && (
                  <PostMatchPlayerReflection playerSession={playerSession} />
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default PlayerClassDialog;

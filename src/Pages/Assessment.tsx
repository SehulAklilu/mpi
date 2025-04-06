import {
  getUserCoursesById,
  updateAssessmentStatus,
  UserAnswer,
} from "@/api/course.api";
import ReadMore from "@/components/common/ReadMore";
import InstructorCard from "@/components/Learn/InstructorCard";
import VideoListItem from "@/components/Learn/VideoListItem";
import { ContentItem, Module } from "@/types/course.types";
import { useEffect, useState } from "react";
import {
  FaClock,
  FaDownload,
  FaFilePdf,
  FaLink,
  FaQuestion,
} from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import instructor from "../assets/user.jpeg";
import { TbReload } from "react-icons/tb";
import LessonDetailSkeleton from "@/components/Learn/LessonDetailSkeleton";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import NewAssessmentComponent, {
  QuestionAnswer,
} from "@/components/Learn/NewAssessmentComponent";

const AssessmentSummary = ({
  assessment,
}: {
  assessment: ContentItem | null;
}) => {
  if (!assessment) {
    return null;
  }
  return (
    <div>
      <div
        key={assessment._id}
        className="grid grid-cols-2 gap-2 text-gray-800 "
      >
        {/* <div className="flex items-center w-fit gap-2">
          <FaBook color="#ff9328" />
          <span className="">{assessment.title}</span>
        </div> */}
        <div className="flex items-center gap-2">
          <FaQuestion color="#ff9328" />
          <span className="">{assessment?.questions?.length} Questions</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-[#ff9328]" />
          <span className="">{assessment.duration} minutes</span>
        </div>
        <div className="flex items-center gap-2 ">
          <TbReload color="#ff9328" />
          <span className=""> {3} Attempt</span>
        </div>
      </div>
    </div>
  );
};

function Assessment() {
  const { course_id, week_id, assessment_id } = useParams();
  const [attempt, setAttempt] = useState(1);
  const navigate = useNavigate();
  const currentItemId = assessment_id;
  const queryClient = useQueryClient();

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const {
    data: selectedCourse,
    isLoading,
    isError,
  } = useQuery<Module, Error>({
    queryKey: ["course", course_id],
    queryFn: () => getUserCoursesById(course_id!),
    enabled: !!course_id,
  });

  interface MutationVariables {
    params: {
      course_id: string;
      assessment_id: string;
    };
    payload: UserAnswer;
  }

  const updateAssessment = useMutation({
    mutationKey: ["update-assessment"],
    mutationFn: ({ params, payload }: MutationVariables) =>
      updateAssessmentStatus(params, payload),
    onSuccess: () => {
      goToNext();
      queryClient.invalidateQueries("courses");
    },
  });

  useEffect(() => {
    if (selectedCourse) {
      const selectedWeek = selectedCourse.weeks.find(
        (week) => week._id == week_id
      );
      const selectedItem = selectedWeek?.contentItems.find(
        (item) => item._id === assessment_id
      );
      selectedItem && setSelectedItem(selectedItem);
    }
  }, [isLoading, selectedCourse, selectedItem, setSelectedItem]);

  const handleNext = (answers: QuestionAnswer[]) => {
    if (
      !course_id ||
      !assessment_id ||
      attempt == null ||
      !selectedItem?.questions
    ) {
      console.log("Missing required data to submit assessment.");
      return;
    }

    const sanitizedAnswers = answers
      .map((a) => a?.userAnswer)
      .filter((answer): answer is string => typeof answer === "string");

    const newPayload: UserAnswer = {
      assessmentId: assessment_id,
      attemptNumber: attempt,
      answers: sanitizedAnswers,
      passed: true, // You might want to calculate this based on score later
      score: selectedItem.questions.length,
    };

    const params = { course_id, assessment_id };
    updateAssessment.mutate({ params, payload: newPayload });
  };

  function navigateToItem(courseId: string, weekId: string, item: ContentItem) {
    if (item.type === "video") {
      navigate(`/course/${courseId}/${weekId}/video/${item._id}`);
    } else if (item.type === "quiz") {
      navigate(`/course/${courseId}/${weekId}/assessment/${item._id}`);
    }
  }

  function goToNext() {
    if (!selectedCourse || !course_id || !week_id || !currentItemId) return;

    const weeks = selectedCourse?.weeks.sort(
      (a, b) => a.weekNumber - b.weekNumber
    );
    const currentWeekIndex = weeks.findIndex((w) => w._id === week_id);
    if (currentWeekIndex === -1) return;

    const currentWeek = weeks[currentWeekIndex];
    const contentItems = currentWeek.contentItems
      .filter((item) => !item.deleted && item.isPublished)
      .sort((a, b) => a.order - b.order);

    const currentItemIndex = contentItems.findIndex(
      (item) => item._id === currentItemId
    );
    if (currentItemIndex === -1) return;

    if (currentItemIndex < contentItems.length - 1) {
      const nextItem = contentItems[currentItemIndex + 1];
      navigateToItem(course_id, week_id, nextItem);
      return;
    }

    if (currentWeekIndex < weeks.length - 1) {
      const nextWeek = weeks[currentWeekIndex + 1];
      const nextItems = nextWeek.contentItems
        .filter((item) => !item.deleted && item.isPublished)
        .sort((a, b) => a.order - b.order);
      if (nextItems.length > 0) {
        const nextItem = nextItems[0];
        navigateToItem(course_id, nextWeek._id, nextItem);
      }
    }
  }

  if (isLoading || !selectedItem) {
    return <LessonDetailSkeleton />;
  }

  return (
    <ContentLayout>
      <div>
        <div className="relative w-full min-h-[50vh] bg-white">
          {selectedItem ? (
            <NewAssessmentComponent
              assessment={selectedItem}
              onContinue={(answers) => handleNext(answers)}
              assessmentPage={false}
              isLoading={updateAssessment.isLoading}
              setAttempt={setAttempt}
            />
          ) : null}
        </div>
        <div className="grid grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
          <div className="col-span-6 lg:col-span-4 order-2 lg:order-1">
            <h1 className="text-2xl font-semibold">{selectedItem?.title}</h1>
            {/* instructor */}
            <InstructorCard
              name="Damian"
              role="Instructor"
              image={instructor}
              rating={5}
              students={40000}
              duration="2 Hrs 15Min"
            />
            {/* course summary */}
            <div className="pt-2 ">
              <h1 className="text-lg">Summary</h1>
              <div className="grid grid-cols-2 gap-x-10 my-2 gap-y-4">
                <AssessmentSummary assessment={selectedItem} />
              </div>
            </div>
            <div className="pt-2 ">
              <ReadMore
                text={selectedItem?.description ?? ""}
                previewLength={300}
              />
            </div>
            {/* resources */}

            <div className="my-2">
              <h1 className="text-lg">Resources</h1>
              <div className="w-fit text-gray-800">
                <div className="flex gap-x-10 py-1 cursor-pointer">
                  <div className="flex gap-x-1">
                    <FaFilePdf color="#FFAC64" />
                    <span>Note-1</span>
                  </div>
                  <FaDownload />
                </div>
                <div className="flex gap-x-10 py-1 cursor-pointer">
                  <div className="flex gap-x-1">
                    <FaFilePdf color="#FFAC64" />
                    <span>Slide-1</span>
                  </div>
                  <FaDownload />
                </div>
                <div className="flex gap-x-2 py-1 cursor-pointer">
                  <FaLink color="#FFAC64" />
                  <span className="underline">Link to a webpage/blog</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block col-span-2 order-1 p-2 bg-[#F8F9FA] rounded-lg">
            {selectedCourse?.weeks.map((week) => (
              <div key={week._id}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold bg-[#ff9328]">
                    {week.weekNumber.toString().padStart(2, "0")}
                  </div>
                  <p className="text-[#152946] text-xl font-semibold">
                    {week.title}
                  </p>
                </div>

                {week.contentItems.map((item, index) => {
                  const identifier =
                    item.type === "video" ? "0" + (index + 1) : undefined;

                  return (
                    <div key={item._id}>
                      <VideoListItem
                        label={item.title}
                        duration={item.duration}
                        identifier={identifier}
                        active={item._id === assessment_id}
                        status={item.progress?.status}
                        locked={
                          item.progress?.status === "locked" || item.order !== 1
                        }
                        onPlay={() => {
                          if (
                            item.progress?.status !== "locked" ||
                            item.order === 1
                          ) {
                            if (item.type === "video") {
                              navigate(
                                `/course/${course_id}/${week._id}/video/${item._id}`
                              );
                            } else if (item.type === "quiz") {
                              navigate(
                                `/course/${course_id}/${week._id}/assessment/${item._id}`
                              );
                            }
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default Assessment;

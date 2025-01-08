import { getCourse } from "@/api/course.api";
import AssessmentComponent from "@/components/Assessment/assessment";
import { Assessment as AssessmentProps } from "@/types/course.types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Assessment() {
  const { course_id, assesment_id } = useParams();
  const [selectedAssessment, setSelectedAssessment] = useState<
    AssessmentProps | undefined
  >(undefined);
  const {
    data: selected_course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", course_id],
    queryFn: () => getCourse(course_id!),
    onSuccess: () =>
      setSelectedAssessment(() =>
        selected_course?.course.courseId.assessments.find(
          (assesment) => assesment._id === assesment_id
        )
      ),
  });

  if (isLoading || isError) {
    return <>Loading</>;
  }
  return (
    <div className="bg-white">
      {selectedAssessment && (
        <AssessmentComponent
          assessment={selectedAssessment}
          onContinue={() => console.log("de")}
          assessmentPage={true}
        />
      )}
    </div>
  );
}

export default Assessment;

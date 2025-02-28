import React, { useState } from "react";
import RatingProgressBar from "../RingProgressBar"; // Import the rating component
import { questions } from "@/lib/question";
import { useMutation } from "react-query";
import { createAssessment } from "@/api/auth.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QUESTIONS_PER_PAGE = 5;

const InitialAssessment = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState(
    Object.fromEntries(questions.map((q) => [q.formKey, 0])) // Default all values to 1
  );
  const navigate = useNavigate();

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRatingChange = (formKey: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: value,
    }));
  };

  const assessment = useMutation({
    mutationKey: ["assessment"],
    mutationFn: createAssessment,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      navigate("/course");
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const handleSubmit = () => {
    const structuredData = {
      initialAssessment: {
        competitiveStateAnxietyInventory: Object.fromEntries(
          questions
            .filter((q) => !q.formKey.includes("ffqm"))
            .map((q) => [q.formKey, (formData[q.formKey] ?? 0) + 1])
        ),
        mindfulnessQuestionnaire: Object.fromEntries(
          questions
            .filter((q) => q.formKey.includes("ffqm"))
            .map((q) => [q.formKey, (formData[q.formKey] ?? 0) + 1])
        ),
      },
    };

    assessment.mutate(structuredData);
  };

  // Get questions for current page
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-center text-xl font-bold mb-2">Assessment</h1>
      <div className=" px-6 pt-4 pb-2 w-full max-w-4xl  border border-primary rounded-3xl">
        {/* Questions & Rating Progress Bars */}
        {currentQuestions.map((question) => (
          <div key={question.no} className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              {question.no}, {question.question}
            </h2>
            <div className="mt-3 w-[50%]">
              <RatingProgressBar
                value={formData[question.formKey]}
                onChange={(value) =>
                  handleRatingChange(question.formKey, value)
                }
                useAlternativeLabels={question.no < 28}
              />
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg border  ${
              currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>

          {currentPage === totalPages - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg flex gap-2 items-center bg-green-700 text-white "
            >
              Submit
              {assessment.isLoading && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-primary text-white"
            >
              Next
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <p className="text-sm text-gray-500 mt-4">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default InitialAssessment;

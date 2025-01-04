import React, { useRef, useState } from "react";
import { motion } from "framer-motion"; // For animations
import { Progress } from "@/components/ui/progress"; // Assuming you're using shadcn/ui
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox from shadcn
import { Assessment } from "@/types/course.types";
// import { FaArrowLeft } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AssessmentProps {
  assessment: Assessment;
}

const AssessmentComponent: React.FC<AssessmentProps> = ({ assessment }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // To store answers

  const currentQuestion = assessment.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Assessment Complete!");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (choice: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: choice,
    });
  };

  return (
    <div className="p-4 space-y-6 px-10 md:px-40 ">
      {/* Header */}
      <IoArrowBackCircleOutline
        onClick={handleBack}
        size={24}
        className="cursor-pointer "
      />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-lg">Assessment</h1>
        <div className="mb-4 w-[50%]">
          <Progress
            value={
              ((currentQuestionIndex + 1) / assessment.questions.length) * 100
            }
            className="mt-2"
          />
        </div>
        <p>
          {currentQuestionIndex + 1} / {assessment.questions.length}
        </p>
      </div>
      {/* Question Animation */}
      <motion.div
        key={currentQuestionIndex} // Re-mounts component on question change
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 "
      >
        <h2>{currentQuestion.question}</h2>
        <div className="space-y-6">
          {currentQuestion.choices.map((choice) => (
            <div
              key={choice}
              className="flex items-center space-x-2 py-3 border rounded-md px-2 cursor-pointer hover:text-wihte hover:bg-orange-500"
              onClick={() => handleAnswerChange(choice)}
            >
              <Checkbox
                id={choice}
                checked={answers[currentQuestion.id] === choice}
                onCheckedChange={() => handleAnswerChange(choice)}
              />

              <label
                htmlFor={choice}
                className="text-sm text-black font-medium"
              >
                {choice}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Next Button */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]} // Prevent moving without answering
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400"
        >
          {currentQuestionIndex < assessment.questions.length - 1
            ? "Next"
            : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default AssessmentComponent;

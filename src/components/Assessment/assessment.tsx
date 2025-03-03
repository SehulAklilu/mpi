import { Assessment } from "@/types/course.types";
import Congrats from "../auth/Congrates";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Progress } from "../ui/progress";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";

interface Question {
  questionId: string;
  userAnswer: string | null;
}

interface AssessmentProps {
  assessment: Assessment;
  onContinue: (answer: Question[]) => void;
  assessmentPage?: boolean;
  isLoading?: boolean;
}

const AssessmentComponent: React.FC<AssessmentProps> = ({
  assessment,
  onContinue,
  assessmentPage,
  isLoading,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Question[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  if (!assessment) {
    return null;
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (isFinished) {
      setIsFinished(false);
      setCurrentQuestionIndex(0);
      setAnswers([]);
    }
  };

  const handleAnswerChange = (choice: string) => {
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === currentQuestion.id
    );

    if (existingAnswerIndex !== -1) {
      // Update the existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.id,
        userAnswer: choice,
      };
      setAnswers(updatedAnswers);
    } else {
      // Add a new answer
      setAnswers([
        ...answers,
        { questionId: currentQuestion.id, userAnswer: choice },
      ]);
    }
  };

  const handleContinue = () => {
    if (assessmentPage) {
      setShowCongratulations(true);
    } else {
      onContinue(answers);
    }
  };

  const handleRetake = () => {
    const clearedAnswers = assessment.questions.map((question) => ({
      questionId: question.id,
      userAnswer: null,
    }));
    setAnswers(clearedAnswers);
    setCurrentQuestionIndex(0);
    setIsFinished(false); // Reset the exam state if needed
  };

  return (
    <div
      className={`flex justify-center items-start ${
        assessmentPage ? "pt-24" : "pt-4"
      }`}
    >
      <div className="p-4 space-y-6 w-full max-w-4xl mx-auto rounded-lg">
        {!showCongratulations ? (
          <div className="w-full">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-lg font-bold">
                {isFinished ? "Results" : "Assessment"}
              </h1>
              {!isFinished && (
                <div className="mb-4 w-full max-w-sm">
                  <Progress
                    value={
                      ((currentQuestionIndex + 1) /
                        assessment.questions.length) *
                      100
                    }
                    className="mt-2"
                  />
                </div>
              )}
            </div>
            {!isFinished ? (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              >
                <h2 className="text-base font-medium">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-6">
                  {currentQuestion.choices.map((choice) => (
                    <div
                      key={choice}
                      className="flex items-center space-x-2 py-3 border rounded-md px-3 cursor-pointer hover:bg-orange-500 hover:text-white"
                      onClick={() => handleAnswerChange(choice)}
                    >
                      <Checkbox
                        id={choice}
                        checked={
                          answers.find(
                            (answer) => answer.questionId === currentQuestion.id
                          )?.userAnswer === choice
                        }
                        onCheckedChange={() => handleAnswerChange(choice)}
                      />
                      <label
                        htmlFor={choice}
                        className="text-sm font-medium text-black"
                      >
                        {choice}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : !assessmentPage && isFinished ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <h2 className="text-lg font-medium py-4">
                    You have answered{" "}
                    {
                      assessment.questions.filter((question) =>
                        answers.some(
                          (answer) =>
                            answer.questionId === question.id &&
                            answer.userAnswer === question.correctAnswer
                        )
                      ).length
                    }{" "}
                    out of {assessment.questions.length} questions correctly.
                  </h2>
                  {answers.every((answer) =>
                    assessment.questions.some(
                      (question) =>
                        question.id === answer.questionId &&
                        answer.userAnswer === question.correctAnswer
                    )
                  ) ? (
                    <button
                      onClick={handleContinue}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-4"
                    >
                      {isLoading ? (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      ) : (
                        "Continue"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleRetake}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Retake Exam
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {assessment.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border p-4 rounded-md bg-gray-50"
                  >
                    <h2 className="text-base font-medium mb-2">
                      {index + 1}. {question.question}
                    </h2>
                    <p className="text-sm">
                      <strong>Your Answer:</strong>{" "}
                      {answers.find(
                        (answer) => answer.questionId === question.id
                      )?.userAnswer || "Not Answered"}
                    </p>
                    <p className="text-sm">
                      <strong>Correct Answer:</strong> {question.correctAnswer}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
            <div className="flex items-center justify-center pt-4">
              {currentQuestionIndex > 0 && !isFinished ? (
                <button
                  onClick={handleBack}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Previous
                </button>
              ) : null}
              {!isFinished ? (
                <button
                  onClick={handleNext}
                  disabled={
                    !answers.find(
                      (answer) => answer.questionId === currentQuestion.id
                    )
                  }
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400 ml-4"
                >
                  {currentQuestionIndex < assessment.questions.length - 1
                    ? "Next"
                    : "Finish"}
                </button>
              ) : assessmentPage ? (
                <button
                  onClick={handleContinue}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-4"
                >
                  Continue
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <Congrats ind={2} setCurr={() => {}} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AssessmentComponent;

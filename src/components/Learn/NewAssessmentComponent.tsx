import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";
import Congrats from "../auth/Congrates";
import { ContentItem } from "@/types/course.types";

export interface QuestionAnswer {
  questionIndex: number;
  userAnswer: string | null;
}

interface AssessmentProps {
  assessment: ContentItem;
  onContinue: (answers: QuestionAnswer[]) => void;
  assessmentPage?: boolean;
  isLoading?: boolean;
  setAttempt: Dispatch<SetStateAction<number>>;
}

const NewAssessmentComponent: React.FC<AssessmentProps> = ({
  assessment,
  onContinue,
  assessmentPage,
  isLoading,
  setAttempt,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  if (!assessment?.questions || assessment.questions.length === 0) {
    return null;
  }

  const questions = assessment.questions;

  const currentQuestion = assessment.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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
      (answer) => answer.questionIndex === currentQuestionIndex
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        questionIndex: currentQuestionIndex,
        userAnswer: choice,
      };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        { questionIndex: currentQuestionIndex, userAnswer: choice },
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
    const clearedAnswers = questions.map((_, index) => ({
      questionIndex: index,
      userAnswer: null,
    }));
    setAttempt((pre) => pre + 1);
    setAnswers(clearedAnswers);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  const isAnswerCorrect = (
    questionIndex: number,
    userAnswer: string | null
  ) => {
    const question = questions[questionIndex];
    if (!question || !userAnswer) return false;
    return question.correctAnswers.includes(userAnswer);
  };

  const correctAnswersCount = answers.reduce((count, answer) => {
    return isAnswerCorrect(answer.questionIndex, answer.userAnswer)
      ? count + 1
      : count;
  }, 0);

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
                  {currentQuestion.options?.map((choice) => (
                    <div
                      key={choice}
                      className="flex items-center space-x-2 py-3 border rounded-md px-3 cursor-pointer hover:bg-orange-500 hover:text-white"
                      onClick={() => handleAnswerChange(choice)}
                    >
                      <Checkbox
                        id={`q${currentQuestionIndex}-${choice}`}
                        checked={
                          answers.find(
                            (answer) =>
                              answer.questionIndex === currentQuestionIndex
                          )?.userAnswer === choice
                        }
                        onCheckedChange={() => handleAnswerChange(choice)}
                      />
                      <label
                        htmlFor={`q${currentQuestionIndex}-${choice}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    You have answered {correctAnswersCount} out of{" "}
                    {assessment.questions.length} questions correctly.
                  </h2>
                  {answers.every((answer) =>
                    isAnswerCorrect(answer.questionIndex, answer.userAnswer)
                  ) ? (
                    <button
                      onClick={handleContinue}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-4"
                    >
                      {isLoading ? (
                        <LoaderCircle className="animate-spin h-5 w-5" />
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
                    key={`result-${index}`}
                    className="border p-4 rounded-md bg-gray-50"
                  >
                    <h2 className="text-base font-medium mb-2">
                      {index + 1}. {question.question}
                    </h2>
                    <p className="text-sm">
                      <strong>Your Answer:</strong>{" "}
                      {answers.find((answer) => answer.questionIndex === index)
                        ?.userAnswer || "Not Answered"}
                    </p>
                    <p className="text-sm">
                      <strong>Correct Answer:</strong>{" "}
                      {question.correctAnswers.join(", ")}
                    </p>
                    {question.explanation && (
                      <p className="text-sm mt-2">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            <div className="flex items-center justify-center pt-4">
              {currentQuestionIndex > 0 && !isFinished && (
                <button
                  onClick={handleBack}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
              {!isFinished ? (
                <button
                  onClick={handleNext}
                  disabled={
                    !answers.find(
                      (answer) => answer.questionIndex === currentQuestionIndex
                    )
                  }
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400 ml-4"
                >
                  {currentQuestionIndex < assessment.questions.length - 1
                    ? "Next"
                    : "Finish"}
                </button>
              ) : (
                assessmentPage && (
                  <button
                    onClick={handleContinue}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-4"
                  >
                    Continue
                  </button>
                )
              )}
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

export default NewAssessmentComponent;

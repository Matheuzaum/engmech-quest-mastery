import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, X, Info } from "lucide-react";

interface Question {
  question: React.ReactNode;
  options?: React.ReactNode[];
  correctAnswer?: number;
  explanation: React.ReactNode;
}

interface QuestionsComponentProps {
  questions: Question[];
}

const QuestionsComponent = ({ questions }: QuestionsComponentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const hasEmptyOptions = !currentQuestion.options || currentQuestion.options.length === 0;

  const handleOptionSelect = (index: number) => {
    if (hasEmptyOptions) return;
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setShowAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Questão {currentQuestionIndex + 1} de {questions.length}
        </h3>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-lg font-medium">
            {currentQuestion.question}
          </div>

          {hasEmptyOptions ? (
            <div className="space-y-4">
              <Button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-white text-black hover:bg-gray-100"
              >
                {showAnswer ? "Ocultar Resposta" : "Ver Resposta"}
              </Button>
              
              {showAnswer && (
                <Alert className="bg-green-50 border-green-200">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {currentQuestion.explanation}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => {
                const isCorrect = currentQuestion.correctAnswer !== undefined && index === currentQuestion.correctAnswer;
                const isSelected = selectedOption === index;
                const showCorrect = showExplanation && isCorrect;
                const showIncorrect = showExplanation && isSelected && !isCorrect;

                return (
                  <Button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showExplanation}
                    className={`w-full justify-start text-left ${
                      showCorrect
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : showIncorrect
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                    {showExplanation && (isSelected || isCorrect) && (
                      <span className="ml-2">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          )}

          {showExplanation && !hasEmptyOptions && (
            <Alert className="bg-green-50 border-green-200">
              <Info className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {currentQuestion.explanation}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Questão Anterior
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          variant="outline"
        >
          Próxima Questão
        </Button>
      </div>
    </div>
  );
};

export default QuestionsComponent;

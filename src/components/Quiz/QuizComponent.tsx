
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: Question[];
  color: string;
}

const QuizComponent = ({ questions, color }: QuizComponentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let className = "";
    
    if (percentage >= 80) {
      message = "Excelente! Você dominou este conteúdo.";
      className = "text-green-600";
    } else if (percentage >= 60) {
      message = "Bom trabalho! Você está no caminho certo.";
      className = "text-blue-600";
    } else {
      message = "Continue praticando para melhorar sua pontuação.";
      className = "text-orange-600";
    }

    return (
      <div className="text-center py-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Quiz Concluído!</h3>
          <p className="text-muted-foreground">
            Você acertou {score} de {questions.length} questões.
          </p>
        </div>

        <div className="relative h-40 w-40 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-200" 
              strokeWidth="10" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className={`text-${color}-600`}
              strokeWidth="10" 
              strokeDasharray={`${percentage * 2.51} 251.2`}
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{percentage}%</span>
          </div>
        </div>

        <p className={`text-lg font-medium ${className}`}>{message}</p>

        <Button 
          onClick={resetQuiz} 
          className={`bg-${color}-600 hover:bg-${color}-700 mt-4`}
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">
          Questão {currentQuestionIndex + 1} de {questions.length}
        </span>
        <span className="badge-progress bg-muted">
          Pontuação: {score} / {questions.length}
        </span>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={cn(
                "quiz-option",
                selectedOption !== null && [
                  index === currentQuestion.correctAnswer && "correct",
                  selectedOption === index && 
                  selectedOption !== currentQuestion.correctAnswer && 
                  "incorrect"
                ]
              )}
            >
              <div className={`w-6 h-6 rounded-full border ${
                selectedOption === null 
                  ? "border-muted-foreground text-muted-foreground" 
                  : index === currentQuestion.correctAnswer
                    ? "bg-green-500 border-green-500 text-white"
                    : selectedOption === index
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-muted-foreground text-muted-foreground"
              } flex items-center justify-center`}>
                {selectedOption === null ? (
                  <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                ) : (
                  index === currentQuestion.correctAnswer ? (
                    <Check className="h-4 w-4" />
                  ) : selectedOption === index ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                  )
                )}
              </div>
              <span className={selectedOption !== null && index === currentQuestion.correctAnswer ? "font-medium" : ""}>
                {option}
              </span>
            </div>
          ))}
        </div>

        {showExplanation && (
          <div className={`mt-6 p-4 border rounded-md ${
            selectedOption === currentQuestion.correctAnswer 
              ? "bg-green-50 border-green-200" 
              : "bg-red-50 border-red-200"
          }`}>
            <p className="font-medium">
              {selectedOption === currentQuestion.correctAnswer 
                ? "Correto!" 
                : `Incorreto. A resposta correta é a opção ${String.fromCharCode(65 + currentQuestion.correctAnswer)}.`
              }
            </p>
            <p className="mt-2 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className={`flex items-center gap-2 bg-${color}-600 hover:bg-${color}-700`}
        >
          <span>
            {currentQuestionIndex < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent;

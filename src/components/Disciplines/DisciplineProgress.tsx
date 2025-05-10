
import { Progress } from "@/components/ui/progress";

interface DisciplineProgressProps {
  progress: number;
  color?: string;
}

const DisciplineProgress = ({ progress, color }: DisciplineProgressProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Progresso geral</span>
        <span>{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 bg-${color}-100`} 
        indicatorClassName={`bg-${color}-600`} 
      />
    </div>
  );
};

export default DisciplineProgress;


import { Progress } from "@/components/ui/progress";

interface TopicProgressProps {
  progress: number;
  color?: string;
}

const TopicProgress = ({ progress, color }: TopicProgressProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span>{progress || 0}% concluído</span>
      </div>
      <Progress 
        value={progress || 0} 
        className={`h-1 bg-${color}-100`} 
        indicatorClassName={`bg-${color}-600`} 
      />
    </div>
  );
};

export default TopicProgress;

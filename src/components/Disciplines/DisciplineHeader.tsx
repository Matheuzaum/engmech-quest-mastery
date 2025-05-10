
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DisciplineProgress from "./DisciplineProgress";

interface DisciplineHeaderProps {
  title: string;
  description: string;
  courseId: string;
  progress: number;
  color?: string;
}

const DisciplineHeader = ({ 
  title, 
  description, 
  courseId, 
  progress, 
  color 
}: DisciplineHeaderProps) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold text-${color}-700`}>{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <div className="shrink-0">
          <Button asChild variant="outline">
            <Link to={`/courses/${courseId}`}>
              Voltar para o curso
            </Link>
          </Button>
        </div>
      </div>
      
      <DisciplineProgress progress={progress} color={color} />
    </div>
  );
};

export default DisciplineHeader;

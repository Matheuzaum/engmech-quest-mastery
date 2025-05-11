
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DisciplineHeaderProps {
  title: string;
  description: string;
  courseId: string;
  color?: string;
}

const DisciplineHeader = ({ 
  title, 
  description, 
  courseId, 
  color = "primary"
}: DisciplineHeaderProps) => {
  // Convert color to a valid Tailwind class or default to primary
  const colorClass = color ? `text-${color}-700` : "text-primary";
  
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${colorClass}`}>{title}</h1>
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
    </div>
  );
};

export default DisciplineHeader;

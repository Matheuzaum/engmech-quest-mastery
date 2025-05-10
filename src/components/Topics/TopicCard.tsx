
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TopicProgress from "./TopicProgress";
import { Topic } from "@/types/course";

interface TopicCardProps {
  topic: Topic;
  courseId: string;
  disciplineId: string;
  progress: number;
  index: number;
  color?: string;
}

const TopicCard = ({ 
  topic, 
  courseId, 
  disciplineId, 
  progress, 
  index, 
  color 
}: TopicCardProps) => {
  return (
    <Card key={topic.id}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-${color}-100 text-${color}-700 text-xs font-bold`}>
              {index + 1}
            </span>
            <span>{topic.title}</span>
          </CardTitle>
          <div className="shrink-0 text-sm text-muted-foreground">
            {progress || 0}% concluído
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{topic.summary}</p>
        <TopicProgress progress={progress} color={color} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          asChild
          className={`bg-${color}-600 hover:bg-${color}-700 flex items-center gap-2`}
          size="sm"
        >
          <Link to={`/courses/${courseId}/${disciplineId}/${topic.id}`}>
            <span>Estudar</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;

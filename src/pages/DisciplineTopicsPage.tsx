
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Home } from "lucide-react";

interface Course {
  id: string;
  title: string;
  color: string;
  disciplines: Discipline[];
}

interface Discipline {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  summary: string;
}

const DisciplineTopicsPage = () => {
  const { courseId, disciplineId } = useParams<{ courseId: string; disciplineId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock progress state (in a real app, this would be stored in a database or local storage)
  const [topicProgress, setTopicProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/data/content.json");
        const data = await response.json();
        
        const foundCourse = data.courses.find((c: Course) => c.id === courseId);
        setCourse(foundCourse || null);
        
        if (foundCourse) {
          const foundDiscipline = foundCourse.disciplines.find((d: Discipline) => d.id === disciplineId);
          setDiscipline(foundDiscipline || null);
          
          // Initialize mock progress data
          if (foundDiscipline) {
            const mockProgress: Record<string, number> = {};
            foundDiscipline.topics.forEach(topic => {
              // Random progress between 0 and 100 for demonstration
              mockProgress[topic.id] = Math.floor(Math.random() * 101);
            });
            setTopicProgress(mockProgress);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, disciplineId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-engineer-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!course || !discipline) {
    return (
      <MainLayout>
        <div className="container py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Disciplina não encontrada</h2>
            <p className="text-muted-foreground mb-6">
              A disciplina que você está procurando não existe ou foi removida.
            </p>
            <Button asChild>
              <Link to="/courses">Voltar para cursos</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Calculate overall discipline progress
  const overallProgress = 
    discipline.topics.length > 0
      ? Math.floor(
          Object.values(topicProgress).reduce((sum, curr) => sum + curr, 0) / 
          discipline.topics.length
        )
      : 0;

  return (
    <MainLayout>
      <div className="container py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-1" />
                  <span>Início</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/courses">Cursos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/courses/${courseId}`}>{course?.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>
                {discipline?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold text-${course?.color}-700`}>{discipline?.title}</h1>
              <p className="text-muted-foreground mt-2">{discipline?.description}</p>
            </div>
            <div className="shrink-0">
              <Button asChild variant="outline">
                <Link to={`/courses/${courseId}`}>
                  Voltar para o curso
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso geral</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress 
              value={overallProgress} 
              className={`h-2 bg-${course?.color}-100`} 
              indicatorClassName={`bg-${course?.color}-600`} 
            />
          </div>
        </div>

        <div className="grid gap-4">
          {discipline?.topics.map((topic, index) => (
            <Card key={topic.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-${course?.color}-100 text-${course?.color}-700 text-xs font-bold`}>
                      {index + 1}
                    </span>
                    <span>{topic.title}</span>
                  </CardTitle>
                  <div className="shrink-0 text-sm text-muted-foreground">
                    {topicProgress[topic.id] || 0}% concluído
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{topic.summary}</p>
                <Progress 
                  value={topicProgress[topic.id] || 0} 
                  className={`h-1 mt-4 bg-${course?.color}-100`} 
                  indicatorClassName={`bg-${course?.color}-600`} 
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  asChild
                  className={`bg-${course?.color}-600 hover:bg-${course?.color}-700 flex items-center gap-2`}
                  size="sm"
                >
                  <Link to={`/courses/${courseId}/${disciplineId}/${topic.id}`}>
                    <span>Estudar</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to={`/courses/${courseId}`}>
              Voltar para o curso
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default DisciplineTopicsPage;

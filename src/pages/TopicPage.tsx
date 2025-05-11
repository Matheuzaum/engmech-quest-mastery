import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Home, Book, Check, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import QuizComponent from "@/components/Quiz/QuizComponent";

interface Course {
  id: string;
  title: string;
  color: string;
  disciplines: Discipline[];
}

interface Discipline {
  id: string;
  title: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  summary: string;
  tips: string[];
  warnings: string[];
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const TopicPage = () => {
  const { courseId, disciplineId, topicId } = useParams<{ courseId: string; disciplineId: string; topicId?: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("resumo");
  const [nextTopic, setNextTopic] = useState<{ disciplineId: string; topicId: string } | null>(null);
  const [prevTopic, setPrevTopic] = useState<{ disciplineId: string; topicId: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/src/data/content.json");
        const data = await response.json();
        
        const foundCourse = data.courses.find((c: Course) => c.id === courseId);
        setCourse(foundCourse || null);
        
        if (foundCourse) {
          const foundDiscipline = foundCourse.disciplines.find((d: Discipline) => d.id === disciplineId);
          setDiscipline(foundDiscipline || null);
          
          if (foundDiscipline) {
            // If no topic ID is provided, use the first topic in the discipline
            const topicToShow = topicId 
              ? foundDiscipline.topics.find((t: Topic) => t.id === topicId) 
              : foundDiscipline.topics[0];
              
            setTopic(topicToShow || null);
            
            // Find the current topic index
            if (topicToShow) {
              const currentIndex = foundDiscipline.topics.findIndex((t: Topic) => t.id === topicToShow.id);
              
              // Find next topic (within same discipline or next discipline)
              let nextTopicData = null;
              if (currentIndex < foundDiscipline.topics.length - 1) {
                nextTopicData = {
                  disciplineId: foundDiscipline.id,
                  topicId: foundDiscipline.topics[currentIndex + 1].id
                };
              } else {
                const disciplineIndex = foundCourse.disciplines.findIndex((d: Discipline) => d.id === disciplineId);
                if (disciplineIndex < foundCourse.disciplines.length - 1) {
                  const nextDiscipline = foundCourse.disciplines[disciplineIndex + 1];
                  if (nextDiscipline.topics.length > 0) {
                    nextTopicData = {
                      disciplineId: nextDiscipline.id,
                      topicId: nextDiscipline.topics[0].id
                    };
                  }
                }
              }
              setNextTopic(nextTopicData);
              
              // Find previous topic (within same discipline or previous discipline)
              let prevTopicData = null;
              if (currentIndex > 0) {
                prevTopicData = {
                  disciplineId: foundDiscipline.id,
                  topicId: foundDiscipline.topics[currentIndex - 1].id
                };
              } else {
                const disciplineIndex = foundCourse.disciplines.findIndex((d: Discipline) => d.id === disciplineId);
                if (disciplineIndex > 0) {
                  const prevDiscipline = foundCourse.disciplines[disciplineIndex - 1];
                  if (prevDiscipline.topics.length > 0) {
                    prevTopicData = {
                      disciplineId: prevDiscipline.id,
                      topicId: prevDiscipline.topics[prevDiscipline.topics.length - 1].id
                    };
                  }
                }
              }
              setPrevTopic(prevTopicData);
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, disciplineId, topicId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!course || !discipline || !topic) {
    return (
      <MainLayout>
        <div className="container py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h2>
            <p className="text-muted-foreground mb-6">
              O tópico que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/courses">Voltar para cursos</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

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
                <Link to={`/courses/${courseId}`}>{course.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/courses/${courseId}/${disciplineId}`}>{discipline.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{topic.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">{topic.title}</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="dicas">Dicas e Macetes</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="resumo" className="mt-6">
            <div className="prose max-w-none">
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-4">Resumo</h3>
                <p className="mb-6 text-foreground/90">{topic.summary}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dicas" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-primary/20 bg-primary/5">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      Dicas e Macetes
                    </h3>
                    <ul className="space-y-2">
                      {topic.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {topic.warnings && topic.warnings.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-lg font-bold">Cuidado com as pegadinhas!</AlertTitle>
                  <AlertDescription>
                    <ul className="mt-2 space-y-2">
                      {topic.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/80 text-white text-xs font-medium shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <QuizComponent questions={topic.questions} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8">
          {prevTopic && (
            <Link
              to={`/courses/${courseId}/${prevTopic.disciplineId}/${prevTopic.topicId}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Tópico anterior
            </Link>
          )}
          {nextTopic && (
            <Link
              to={`/courses/${courseId}/${nextTopic.disciplineId}/${nextTopic.topicId}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Próximo tópico
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TopicPage;

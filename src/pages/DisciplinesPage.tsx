
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Book, Home } from "lucide-react";
import { Course, Discipline, Topic } from "@/types/course";

const DisciplinesPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("/src/data/content.json");
        const data = await response.json();
        const foundCourse = data.courses.find((c: Course) => c.id === courseId);
        setCourse(foundCourse || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Function to get button class based on course color
  const getButtonClass = (color: string) => {
    return `w-full bg-${color}-600 hover:bg-${color}-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors`;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-engineer-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="container py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Curso não encontrado</h2>
            <p className="text-muted-foreground mb-6">
              O curso que você está procurando não existe ou foi removido.
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
              <BreadcrumbLink isCurrentPage>
                {course?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold text-${course?.color}-700`}>{course?.title}</h1>
              <p className="text-muted-foreground mt-2">{course?.description}</p>
            </div>
            <div className="shrink-0">
              <Button asChild variant="outline">
                <Link to="/courses">
                  Voltar para cursos
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course?.disciplines.map((discipline) => (
            <Card key={discipline.id} className="card-hover">
              <CardHeader>
                <CardTitle>{discipline.title}</CardTitle>
                <CardDescription className="line-clamp-2">{discipline.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-2">Tópicos incluídos:</p>
                <ul className="space-y-1 ml-1">
                  {discipline.topics.slice(0, 3).map((topic) => (
                    <li key={topic.id} className="flex items-start text-sm gap-2">
                      <Book className={`h-4 w-4 mt-1 shrink-0 text-${course?.color}-600`} />
                      <span className="line-clamp-1">{topic.title}</span>
                    </li>
                  ))}
                  {discipline.topics.length > 3 && (
                    <li className="text-sm text-muted-foreground">
                      + {discipline.topics.length - 3} mais tópicos
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/courses/${courseId}/${discipline.id}`}
                  className={getButtonClass(course.color)}
                >
                  <span>Ver Disciplina</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DisciplinesPage;

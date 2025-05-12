import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Book, Home } from "lucide-react";
import { Course, Discipline, Topic } from "@/types/course";
import content from "@/data/content.json";

const DisciplinesPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the imported content directly
    const foundCourse = content.courses.find((c: Course) => c.id === courseId);
    setCourse(foundCourse || null);
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
      <div className="container py-20">
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
              <h1 className="text-3xl font-bold text-primary">{course?.title}</h1>
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
                  {Array.isArray(discipline.topics) && discipline.topics.slice(0, 3).map((topic) => (
                    <li key={topic.id} className="flex items-start text-sm gap-2">
                      <Book className="h-4 w-4 mt-1 shrink-0 text-primary" />
                      <span className="line-clamp-1">{topic.title}</span>
                    </li>
                  ))}
                  {Array.isArray(discipline.topics) && discipline.topics.length > 3 && (
                    <li className="text-sm text-muted-foreground">
                      + {discipline.topics.length - 3} mais tópicos
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/courses/${courseId}/${discipline.id}`}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Estudar</span>
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

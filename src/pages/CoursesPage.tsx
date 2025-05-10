
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  disciplines: {
    id: string;
    title: string;
    description: string;
    topics: any[];
  }[];
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/src/data/content.json");
        const data = await response.json();
        setCourses(data.courses);
        setFilteredCourses(data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const getTopicsCount = (course: Course) => {
    return course.disciplines.reduce((acc, discipline) => {
      return acc + discipline.topics.length;
    }, 0);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Cursos de Engenharia Mecânica</h1>
            <p className="text-muted-foreground">
              Explore nossos cursos gamificados e aprenda os conceitos fundamentais de engenharia mecânica de forma rápida e eficaz.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar cursos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-engineer-600"></div>
            </div>
          ) : (
            <>
              {filteredCourses.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">Nenhum curso encontrado para "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden card-hover">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-xl font-bold text-${course.color}-700`}>{course.title}</h3>
                          <Badge variant="outline" className={`bg-${course.color}-50 text-${course.color}-700 border-${course.color}-200`}>
                            {course.disciplines.length} disciplinas
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{course.description}</p>
                        <div className="mt-4">
                          <p className="text-sm font-medium">Inclui:</p>
                          <ul className="mt-2 space-y-1">
                            <li className="flex items-center text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`h-4 w-4 mr-2 text-${course.color}-600`}
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              {getTopicsCount(course)} tópicos com resumos
                            </li>
                            <li className="flex items-center text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`h-4 w-4 mr-2 text-${course.color}-600`}
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              Dicas e macetes
                            </li>
                            <li className="flex items-center text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`h-4 w-4 mr-2 text-${course.color}-600`}
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              Exercícios interativos
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/courses/${course.id}`}
                          className={`w-full bg-${course.color}-600 hover:bg-${course.color}-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors`}
                        >
                          <span>Ver disciplinas</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;

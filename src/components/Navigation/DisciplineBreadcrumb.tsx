
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface DisciplineBreadcrumbProps {
  courseId: string;
  courseTitle?: string;
  disciplineTitle?: string;
}

const DisciplineBreadcrumb = ({ 
  courseId, 
  courseTitle, 
  disciplineTitle 
}: DisciplineBreadcrumbProps) => {
  return (
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
            <Link to={`/courses/${courseId}`}>{courseTitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>
            {disciplineTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DisciplineBreadcrumb;

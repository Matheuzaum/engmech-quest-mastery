
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/Layout/MainLayout";
import DisciplineBreadcrumb from "@/components/Navigation/DisciplineBreadcrumb";
import DisciplineHeader from "@/components/Disciplines/DisciplineHeader";
import TopicCard from "@/components/Topics/TopicCard";
import { useDisciplineData } from "@/hooks/useDisciplineData";

const DisciplineTopicsPage = () => {
  const { courseId, disciplineId } = useParams<{ courseId: string; disciplineId: string }>();
  const { course, discipline, topicProgress, loading, overallProgress } = useDisciplineData(courseId, disciplineId);

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

  return (
    <MainLayout>
      <div className="container py-10">
        <DisciplineBreadcrumb 
          courseId={courseId || ''} 
          courseTitle={course?.title} 
          disciplineTitle={discipline?.title} 
        />

        <DisciplineHeader 
          title={discipline.title}
          description={discipline.description}
          courseId={courseId || ''}
          progress={overallProgress}
          color={course.color}
        />

        <div className="grid gap-4">
          {discipline?.topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              courseId={courseId || ''}
              disciplineId={disciplineId || ''}
              progress={topicProgress[topic.id] || 0}
              index={index}
              color={course.color}
            />
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

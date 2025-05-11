
import { useState, useEffect } from "react";
import { Course, Discipline } from "@/types/course";
import content from "@/data/content.json";

interface UseDisciplineDataResult {
  course: Course | null;
  discipline: Discipline | null;
  topicProgress: Record<string, number>;
  loading: boolean;
  overallProgress: number;
}

export const useDisciplineData = (courseId?: string, disciplineId?: string): UseDisciplineDataResult => {
  const [course, setCourse] = useState<Course | null>(null);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [loading, setLoading] = useState(true);
  const [topicProgress, setTopicProgress] = useState<Record<string, number>>({});
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Use the imported content directly instead of fetching
    const foundCourse = content.courses.find((c: Course) => c.id === courseId);
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
        
        // Calculate overall discipline progress
        const calculatedProgress = 
          foundDiscipline.topics.length > 0
            ? Math.floor(
                Object.values(mockProgress).reduce((sum, curr) => sum + curr, 0) / 
                foundDiscipline.topics.length
              )
            : 0;
            
        setOverallProgress(calculatedProgress);
      }
    }
    
    setLoading(false);
  }, [courseId, disciplineId]);

  return { 
    course, 
    discipline, 
    topicProgress, 
    loading,
    overallProgress
  };
};

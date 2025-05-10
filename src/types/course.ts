
export interface Topic {
  id: string;
  title: string;
  summary: string;
  tips?: string[];
  warnings?: string[];
  questions?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  color: string;
  description: string;
  image: string;
  icon?: string;
  disciplines: Discipline[];
}

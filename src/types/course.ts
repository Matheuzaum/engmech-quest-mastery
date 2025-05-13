export interface Topic {
  id: string;
  title: string;
  summary: string;
  tips?: string[];
  warnings?: string[];
  questions?: {
    question: string | JSX.Element[]; // Updated to accept JSX.Element[]
    options: (string | JSX.Element[])[]; // Updated to accept JSX.Element[]
    correctAnswer: number;
    explanation: string | JSX.Element[]; // Updated to accept JSX.Element[]
  }[];
}

export interface Discipline {
  id: string;
  title: string;
  description?: string; // Made optional
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  color: string;
  description?: string; // Made optional
  image: string;
  icon?: string;
  disciplines: Discipline[];
}


export interface Topic {
  id: string;
  title: string;
  summary: string;
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
  disciplines: Discipline[];
}

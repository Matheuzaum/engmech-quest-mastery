import React from 'react';
import { ArrowRight, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import content from "@/data/content.json";
import OptimizedImage from '../components/OptimizedImage';

const Index = () => {
  const scrollToComoFunciona = () => {
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-14 pb-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                Engenharia Mecânica Simplificada
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Aprenda de forma rápida e eficaz os conceitos fundamentais de engenharia mecânica através de resumos, dicas e exercícios interativos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/courses">Começar</Link>
              </Button>
              <Button asChild variant="outline" onClick={scrollToComoFunciona}>
                <Link to="#como-funciona">Como Funciona</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="content-section">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Resumos Objetivos</h3>
              <p className="mt-2 text-muted-foreground">
                Resumos concisos organizados por frequência de aparecimento em provas e exames.
              </p>
            </div>
            <div className="content-section">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                  className="h-6 w-6"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Dicas Essenciais</h3>
              <p className="mt-2 text-muted-foreground">
                Macetes e dicas para memorizar fórmulas e conceitos complexos de forma simples.
              </p>
            </div>
            <div className="content-section">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Exercícios Práticos</h3>
              <p className="mt-2 text-muted-foreground">
                Questões interativas que testam seu conhecimento e reforçam o aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
            Acesso Rápido aos Cursos
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.courses.map((course) => (
              <div key={course.id} className="course-card">
                <OptimizedImage
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="course-image"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="badge-progress bg-primary/10 text-primary">
                      {course.disciplines.length} disciplinas
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/courses">
                Ver Todos os Cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">Como Funciona</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="content-section text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                <Book className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Conteúdo Organizado</h3>
              <p className="text-muted-foreground">Material estruturado de forma clara e objetiva</p>
            </div>
            <div className="content-section text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
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
                  className="h-8 w-8"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Dicas Rápidas</h3>
              <p className="text-muted-foreground">Macetes e truques para facilitar o aprendizado</p>
            </div>
            <div className="content-section text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
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
                  className="h-8 w-8"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Gamificação</h3>
              <p className="text-muted-foreground">Aprenda brincando com questões interativas</p>
            </div>
            <div className="content-section text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
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
                  className="h-8 w-8"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pegadinhas</h3>
              <p className="text-muted-foreground">Fique atento aos pontos mais confusos</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

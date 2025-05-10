
import { ArrowRight, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-14 pb-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-engineer-700 to-mechanic-600 bg-clip-text text-transparent">
                Engenharia Mecânica Simplificada
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Aprenda de forma rápida e eficaz os conceitos fundamentais de engenharia mecânica através de resumos, dicas e exercícios interativos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-engineer-600 hover:bg-engineer-700">
                <Link to="/login">Entrar na Plataforma</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="#">Como Funciona</Link>
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
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-engineer-100 text-engineer-700">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Resumos Objetivos</h3>
              <p className="mt-2 text-muted-foreground">
                Resumos concisos organizados por frequência de aparecimento em provas e exames.
              </p>
            </div>
            <div className="content-section">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-mechanic-100 text-mechanic-700">
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
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-engineer-100 text-engineer-700">
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
            <Link to="/courses/fluid-mechanics" className="group card-hover overflow-hidden rounded-lg border bg-card">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Mecânica dos Fluidos"
                  className="object-cover w-full h-full transition-all group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-engineer-700">Mecânica dos Fluidos</h3>
                <p className="mt-2 text-muted-foreground">
                  Estudo do comportamento dos líquidos e gases em repouso e em movimento
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="badge-progress bg-engineer-100 text-engineer-700">
                    8 tópicos
                  </span>
                  <ArrowRight className="h-5 w-5 text-engineer-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            <Link to="/courses/thermodynamics" className="group card-hover overflow-hidden rounded-lg border bg-card">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
                  alt="Termodinâmica"
                  className="object-cover w-full h-full transition-all group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-mechanic-700">Termodinâmica</h3>
                <p className="mt-2 text-muted-foreground">
                  Estudo da energia térmica, calor e trabalho, e suas conversões
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="badge-progress bg-mechanic-100 text-mechanic-700">
                    6 tópicos
                  </span>
                  <ArrowRight className="h-5 w-5 text-mechanic-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            <Link to="/courses/materials-strength" className="group card-hover overflow-hidden rounded-lg border bg-card">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Resistência dos Materiais"
                  className="object-cover w-full h-full transition-all group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-engineer-700">Resistência dos Materiais</h3>
                <p className="mt-2 text-muted-foreground">
                  Análise do comportamento de sólidos submetidos a cargas
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="badge-progress bg-engineer-100 text-engineer-700">
                    7 tópicos
                  </span>
                  <ArrowRight className="h-5 w-5 text-engineer-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-engineer-600 hover:bg-engineer-700">
              <Link to="/courses">
                Ver Todos os Cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
            O que nossos alunos dizem
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="content-section">
              <p className="italic">
                "Os resumos e dicas me ajudaram a passar em uma prova que eu estava tendo dificuldade. Recomendo para todos os estudantes de engenharia!"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold">Marco Silva</p>
                  <p className="text-sm text-muted-foreground">Estudante de Engenharia</p>
                </div>
              </div>
            </div>
            <div className="content-section">
              <p className="italic">
                "O formato gamificado torna o estudo muito mais divertido e eficiente. Consegui entender conceitos complexos em menos tempo."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                  C
                </div>
                <div>
                  <p className="font-semibold">Carla Mendes</p>
                  <p className="text-sm text-muted-foreground">Engenheira Mecânica</p>
                </div>
              </div>
            </div>
            <div className="content-section">
              <p className="italic">
                "As 'pegadinhas' me alertaram para erros que eu provavelmente cometeria nas provas. Fantástico!"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold">Rafael Gomes</p>
                  <p className="text-sm text-muted-foreground">Professor Universitário</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

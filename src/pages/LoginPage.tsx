
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/Layout/MainLayout";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Mock authentication - would connect to Supabase in a real app
      console.log("Login attempt with:", values);
      toast({
        title: "Login simulado",
        description: "Em uma aplicação real, isso conectaria ao Supabase para autenticação",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro durante o login, tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    try {
      // Mock Google authentication - would connect to OAuth provider in a real app
      console.log("Google login attempt");
      toast({
        title: "Login com Google simulado",
        description: "Em uma aplicação real, isso abriria a autenticação do Google",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro ao fazer login com Google",
        description: "Ocorreu um erro durante o login com Google, tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Entrar na plataforma</CardTitle>
            <CardDescription>
              Acesse sua conta para continuar aprendendo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-engineer-600 hover:bg-engineer-700" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
              </div>
            </div>

            <Button 
              type="button"
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Login com Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/signup" className="font-medium text-engineer-600 hover:text-engineer-700">
                Cadastre-se
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/" className="font-medium text-engineer-600 hover:text-engineer-700">
                Esqueci minha senha
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LoginPage;

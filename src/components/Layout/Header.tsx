
import { Book, Home, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Book className="h-6 w-6 text-engineer-700" />
            <span className="text-xl font-heading font-bold">EngRápido</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link text-foreground/80 hover:text-foreground">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link to="/courses" className="nav-link text-foreground/80 hover:text-foreground">
            <Book className="h-4 w-4" />
            <span>Cursos</span>
          </Link>
          <Button variant="default" className="bg-engineer-600 hover:bg-engineer-700">
            Começar Agora
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              <Link 
                to="/" 
                className="flex items-center gap-2 py-2 text-foreground" 
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span className="text-lg">Início</span>
              </Link>
              <Link 
                to="/courses" 
                className="flex items-center gap-2 py-2 text-foreground" 
                onClick={() => setIsOpen(false)}
              >
                <Book className="h-5 w-5" />
                <span className="text-lg">Cursos</span>
              </Link>
              <Button 
                variant="default" 
                className="mt-2 bg-engineer-600 hover:bg-engineer-700"
                onClick={() => setIsOpen(false)}
              >
                Começar Agora
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

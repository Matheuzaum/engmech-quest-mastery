import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <i className="fa-solid fa-graduation-cap text-2xl" style={{ color: '#3b82f6' }}></i>
              <span className="text-xl font-heading font-bold text-primary">EngRápido</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/" className="text-sm text-foreground/70 hover:text-foreground">
              Início
            </Link>
            <Link to="/courses" className="text-sm text-foreground/70 hover:text-foreground">
              Cursos
            </Link>
            <Link to="#" className="text-sm text-foreground/70 hover:text-foreground">
              Sobre
            </Link>
            <Link to="#" className="text-sm text-foreground/70 hover:text-foreground">
              Contato
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} EngRápido. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

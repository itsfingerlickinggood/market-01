
import { Button } from "@/components/ui/button";
import { Zap, Github, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">GPUTrade</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
            <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4" />
              <Star className="h-4 w-4" />
              <span>2.3k</span>
            </div>
            <Button variant="outline" className="border-border hover:bg-accent hover:text-accent-foreground">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

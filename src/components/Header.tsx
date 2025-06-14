
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-xl' 
          : 'bg-background/90 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left spacer for perfect centering */}
          <div className="flex items-center space-x-6 w-1/3">
            {/* Search Bar */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GPUs..."
                className="pl-12 w-80 h-12 bg-muted/40 border-border/30 focus:bg-background/80 focus:border-primary/50 rounded-2xl transition-all duration-300 shadow-lg"
              />
            </div>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center w-1/3">
            <Link to="/" className="flex items-center hover:opacity-80 transition-all duration-300">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                market01
              </span>
            </Link>
          </div>

          {/* Right Side - User Dropdown */}
          <div className="flex items-center justify-end space-x-6 w-1/3">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-2xl hover:bg-muted/60 transition-all duration-300 shadow-lg border border-border/20">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-2">
                <DropdownMenuItem className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-2xl hover:bg-muted/60 transition-all duration-300 shadow-lg border border-border/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl rounded-b-2xl mt-2 shadow-xl">
            <nav className="py-8 space-y-4">
              <div className="px-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search GPUs..."
                    className="pl-12 w-full h-12 bg-muted/40 border-border/30 focus:bg-background/80 focus:border-primary/50 rounded-2xl transition-all duration-300 shadow-lg"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

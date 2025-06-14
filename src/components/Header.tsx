
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
          ? 'bg-background/98 backdrop-blur-xl border-b border-border/60 shadow-lg' 
          : 'bg-background/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Left spacer for centering */}
          <div className="flex items-center space-x-4 w-1/3">
            {/* Search Bar */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GPUs..."
                className="pl-12 w-72 h-11 bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 rounded-xl transition-all duration-200"
              />
            </div>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center w-1/3">
            <Link to="/" className="flex items-center hover:opacity-90 transition-all duration-200">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                market01
              </span>
            </Link>
          </div>

          {/* Right Side - User Dropdown */}
          <div className="flex items-center justify-end space-x-4 w-1/3">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-muted/80 transition-all duration-200">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-background/98 backdrop-blur-xl border border-border/60 shadow-xl rounded-xl">
                <DropdownMenuItem className="h-10 rounded-lg">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="h-10 rounded-lg">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="h-10 rounded-lg">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-xl hover:bg-muted/80 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/98 backdrop-blur-xl rounded-b-xl mt-2">
            <nav className="py-6 space-y-3">
              <div className="px-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search GPUs..."
                    className="pl-12 w-full h-11 bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 rounded-xl transition-all duration-200"
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

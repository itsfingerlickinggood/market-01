

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

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
          {/* Left Side - User Dropdown */}
          <div className="flex items-center justify-start w-1/3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-2xl hover:bg-muted/60 transition-all duration-300 shadow-lg border border-border/20">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-2">
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
          </div>

          {/* Centered Logo with Theme Switcher */}
          <div className="flex justify-center w-1/3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-2xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-all duration-300">
                  market01
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-2">
                <DropdownMenuItem 
                  onClick={() => setTheme("light")}
                  className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200"
                >
                  <Sun className="h-4 w-4 mr-3" />
                  Light
                  {theme === "light" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("dark")}
                  className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200"
                >
                  <Moon className="h-4 w-4 mr-3" />
                  Dark
                  {theme === "dark" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("system")}
                  className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200"
                >
                  <Monitor className="h-4 w-4 mr-3" />
                  System Default
                  {theme === "system" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side - Live Status */}
          <div className="flex items-center justify-end space-x-6 w-1/3">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1 text-xs font-medium animate-pulse">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              LIVE
            </Badge>

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
                <p className="text-sm text-muted-foreground">Mobile menu</p>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


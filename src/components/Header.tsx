
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, User, Zap, Menu, X } from "lucide-react";
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

  const navItems = [
    { name: "Browse GPUs", href: "/marketplace" }
  ];

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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GPUCloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold transition-all duration-300 hover:text-primary relative group py-2 ${
                  location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GPUs..."
                className="pl-12 w-72 h-11 bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 rounded-xl transition-all duration-200"
              />
            </div>

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

            {/* Get Started Button */}
            <Button className="hidden sm:flex h-11 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </Button>

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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-muted/60 rounded-lg mx-4 ${
                    location.pathname === item.href 
                      ? 'text-primary bg-muted/80' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-6 pt-4">
                <Button className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-lg">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

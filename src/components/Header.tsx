import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Zap, ChevronDown, Users } from "lucide-react";
import SmartNotifications from "@/components/SmartNotifications";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    {
      name: 'Marketplace',
      href: '/marketplace'
    }, 
    {
      name: 'Analytics',
      href: '/analytics'
    }, 
    {
      name: 'Community',
      href: '/community'
    }, 
    {
      name: 'Contact',
      href: '/contact'
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">market01</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActivePath(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {item.name}
                {item.name === 'Community' && <Users className="h-3 w-3 ml-1 inline" />}
              </Link>)}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <SmartNotifications />
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  More
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/community">
                    <Users className="h-4 w-4 mr-2" />
                    Community Forum
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>API Access</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActivePath(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  {item.name}
                  {item.name === 'Community' && <Users className="h-3 w-3 ml-1 inline" />}
                </Link>)}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <ThemeToggle />
                <Button size="sm" className="flex-1 ml-3">Sign In</Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};

export default Header;

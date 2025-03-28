
import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary">
              Atlas Obscura
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#places" className="nav-link font-medium">Places</a>
            <a href="#experiences" className="nav-link font-medium">Experiences</a>
            <a href="#stories" className="nav-link font-medium">Stories</a>
            <a href="#mapexplorer" className="nav-link font-medium">Map Explorer</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="rounded-full">
              <User className="h-5 w-5 mr-2" />
              <span>Sign In</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="py-4 px-4 space-y-4">
            <a href="#places" className="block py-2 font-medium">Places</a>
            <a href="#experiences" className="block py-2 font-medium">Experiences</a>
            <a href="#stories" className="block py-2 font-medium">Stories</a>
            <a href="#mapexplorer" className="block py-2 font-medium">Map Explorer</a>
            <div className="pt-4 flex items-center justify-between">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                <span>Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

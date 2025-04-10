
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, X, Heart, User, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

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
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary dark:text-white">
              Atlas Obscura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link font-medium dark:text-gray-300 dark:hover:text-white">Home</Link>
            <a href="/#places" className="nav-link font-medium dark:text-gray-300 dark:hover:text-white">Places</a>
            <Link to="/experiences" className="nav-link font-medium dark:text-gray-300 dark:hover:text-white">Experiences</Link>
            <Link to="/stories" className="nav-link font-medium dark:text-gray-300 dark:hover:text-white">Stories</Link>
            <Link to="/map" className="nav-link font-medium dark:text-gray-300 dark:hover:text-white">Map Explorer</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="dark:text-gray-300 dark:hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="dark:text-gray-300 dark:hover:text-white">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="dark:text-gray-300 dark:hover:text-white">
              <Heart className="h-5 w-5" />
            </Button>
            <Toggle 
              pressed={isDarkMode}
              onPressedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="rounded-full p-2 hover:bg-accent"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Toggle>
            <Button variant="outline" className="rounded-full dark:bg-transparent dark:text-white dark:border-gray-600">
              <User className="h-5 w-5 mr-2" />
              <span>Sign In</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden dark:text-white"
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
        <div className="md:hidden bg-white dark:bg-gray-900 dark:text-gray-200">
          <div className="py-4 px-4 space-y-4">
            <Link to="/" className="block py-2 font-medium">Home</Link>
            <a href="/#places" className="block py-2 font-medium">Places</a>
            <Link to="/experiences" className="block py-2 font-medium">Experiences</Link>
            <Link to="/stories" className="block py-2 font-medium">Stories</Link>
            <Link to="/map" className="block py-2 font-medium">Map Explorer</Link>
            <div className="flex items-center justify-between pt-4">
              <Toggle 
                pressed={isDarkMode}
                onPressedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="rounded-full p-2 hover:bg-accent"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="ml-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </Toggle>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full dark:bg-transparent dark:text-white dark:border-gray-600">
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

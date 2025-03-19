
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'Release Calendar', path: '/releases' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled 
          ? 'bg-gaming-dark/90 backdrop-blur-lg shadow-md' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-red to-white">
              GamerHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gaming-text-secondary hover:text-gaming-text-primary link-hover transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and User */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gaming-text-secondary hover:text-gaming-text-primary transition-colors p-2">
              <Search size={20} />
            </button>
            <button className="text-gaming-text-secondary hover:text-gaming-text-primary transition-colors p-2">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gaming-text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gaming-dark-accent border-t border-gaming-card-bg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-medium text-gaming-text-secondary hover:text-gaming-text-primary px-2 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <button className="text-gaming-text-secondary hover:text-gaming-text-primary transition-colors p-2">
                  <Search size={20} />
                </button>
                <button className="text-gaming-text-secondary hover:text-gaming-text-primary transition-colors p-2">
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

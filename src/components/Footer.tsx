
import { Mail, Github, Twitter, Instagram, Twitch, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gaming-dark-accent pt-16 pb-8 border-t border-gaming-card-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-red to-white">
                GamerHub
              </span>
            </div>
            <p className="text-sm text-gaming-text-secondary mb-6">
              Your premium destination for gaming news, reviews, and community discussions.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-gaming-text-secondary hover:text-gaming-red transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gaming-text-secondary hover:text-gaming-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gaming-text-secondary hover:text-gaming-red transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="#" 
                className="text-gaming-text-secondary hover:text-gaming-red transition-colors"
                aria-label="Twitch"
              >
                <Twitch size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/games" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Games
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/releases" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Release Calendar
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gaming-text-secondary hover:text-gaming-red transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gaming-text-secondary mb-4">
              Subscribe to our newsletter for the latest gaming news and exclusive content.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gaming-dark border border-white/10 text-sm rounded-l-sm px-4 py-2 w-full focus:outline-none focus:border-gaming-red transition-colors"
              />
              <button className="bg-gaming-red hover:bg-gaming-red-hover text-white px-4 py-2 rounded-r-sm transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gaming-text-secondary">
            © {currentYear} GamerHub. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-gaming-text-secondary hover:text-gaming-red transition-colors"
            >
              <Github size={14} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

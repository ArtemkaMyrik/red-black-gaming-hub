
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-4">
            <div className="text-[120px] font-bold text-gaming-red opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold text-gaming-red">404</div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gaming-text-secondary mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gaming-red hover:bg-gaming-red-hover text-white rounded-sm transition-all duration-200"
          >
            <Home size={18} />
            Back to Home
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

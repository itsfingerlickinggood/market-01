
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DelightfulErrorStates from "@/components/DelightfulErrorStates";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <DelightfulErrorStates 
          type="notFound"
          onGoHome={handleGoHome}
          onContactSupport={handleContactSupport}
        />
      </div>
    </div>
  );
};

export default NotFound;

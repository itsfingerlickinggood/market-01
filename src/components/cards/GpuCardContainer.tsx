
import { useState } from "react";

interface GpuCardContainerProps {
  children: (isHovered: boolean) => React.ReactNode;
  className?: string;
}

const GpuCardContainer = ({ children, className = "" }: GpuCardContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          transition-all duration-500 cursor-pointer
          ${isHovered ? 
            'absolute inset-0 z-50 transform scale-110' : 
            'relative z-10 hover:shadow-lg hover:-translate-y-1'
          }
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`
          bg-gradient-to-br from-card via-card/98 to-primary/8 backdrop-blur-lg rounded-lg
          ${isHovered ? 
            'shadow-2xl ring-1 ring-primary/20' : 
            'shadow-sm hover:shadow-md'
          }
          transition-all duration-500 relative overflow-hidden
        `}>
          {/* Enhanced glossy overlay effect when hovered */}
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-primary/10 pointer-events-none z-10 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse pointer-events-none z-20 rounded-lg" />
              <div className="absolute inset-0 rounded-lg ring-2 ring-primary/30 pointer-events-none z-30" />
            </>
          )}
          
          <div className={`p-4 space-y-3 transition-all duration-300 ${isHovered ? 'relative z-40' : ''}`}>
            {children(isHovered)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpuCardContainer;

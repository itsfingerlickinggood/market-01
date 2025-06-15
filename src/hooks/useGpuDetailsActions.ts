
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useGpuDetailsActions = () => {
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? "This GPU has been removed from your favorites." 
        : "This GPU has been added to your favorites.",
    });
  };

  const handleAlert = () => {
    setHasAlert(!hasAlert);
    toast({
      title: hasAlert ? "Alert removed" : "Price alert set",
      description: hasAlert 
        ? "You will no longer receive price alerts for this GPU." 
        : "You'll be notified when the price changes.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "GPU details link has been copied to your clipboard.",
    });
  };

  return {
    isFavorited,
    hasAlert,
    activeSection,
    setActiveSection,
    handleFavorite,
    handleAlert,
    handleShare
  };
};

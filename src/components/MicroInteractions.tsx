
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Star, 
  Bookmark, 
  Share2, 
  Zap,
  CheckCircle,
  Copy,
  Download,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MicroInteractionProps {
  type: 'favorite' | 'rating' | 'bookmark' | 'share' | 'copy' | 'download';
  initialState?: boolean | number;
  onInteraction?: (value: any) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const MicroInteraction = ({ 
  type, 
  initialState, 
  onInteraction, 
  disabled = false,
  children 
}: MicroInteractionProps) => {
  const [state, setState] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleInteraction = (newValue: any) => {
    if (disabled) return;
    
    setIsAnimating(true);
    setState(newValue);
    onInteraction?.(newValue);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const FavoriteButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleInteraction(!state)}
      className={`relative transition-all duration-200 hover:scale-110 ${
        state ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
      } ${isAnimating ? 'animate-pulse' : ''}`}
      disabled={disabled}
    >
      <Heart 
        className={`h-4 w-4 transition-all duration-200 ${
          state ? 'fill-current' : ''
        } ${isAnimating ? 'scale-125' : ''}`} 
      />
      {state && (
        <div className="absolute inset-0 animate-ping">
          <Heart className="h-4 w-4 fill-red-300 text-red-300 opacity-75" />
        </div>
      )}
    </Button>
  );

  const RatingStars = () => {
    const rating = (state as number) || 0;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            onClick={() => handleInteraction(star)}
            className="p-1 hover:scale-110 transition-transform"
            disabled={disabled}
          >
            <Star
              className={`h-4 w-4 transition-all duration-200 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-muted-foreground hover:text-yellow-300'
              } ${isAnimating && star === rating ? 'animate-bounce' : ''}`}
            />
          </Button>
        ))}
      </div>
    );
  };

  const BookmarkButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleInteraction(!state)}
      className={`transition-all duration-200 hover:scale-110 ${
        state ? 'text-blue-500' : 'text-muted-foreground hover:text-blue-400'
      } ${isAnimating ? 'animate-bounce' : ''}`}
      disabled={disabled}
    >
      <Bookmark 
        className={`h-4 w-4 transition-all duration-200 ${
          state ? 'fill-current' : ''
        }`} 
      />
    </Button>
  );

  const ShareButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleInteraction(true);
        toast({
          title: "Link copied! 🔗",
          description: "Share this awesome GPU with your team",
        });
      }}
      className="hover:scale-110 transition-transform hover:text-green-500"
      disabled={disabled}
    >
      <Share2 className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
    </Button>
  );

  const CopyButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleInteraction(true);
        toast({
          title: "Copied! ✨",
          description: "Command copied to clipboard",
        });
      }}
      className="hover:scale-110 transition-transform"
      disabled={disabled}
    >
      {isAnimating ? (
        <CheckCircle className="h-4 w-4 text-green-500 animate-scale-in" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const DownloadButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleInteraction(true);
        toast({
          title: "Download started! 📥",
          description: "Your file will be ready shortly",
        });
      }}
      className="hover:scale-110 transition-transform hover:text-purple-500"
      disabled={disabled}
    >
      <Download className={`h-4 w-4 ${isAnimating ? 'animate-bounce' : ''}`} />
    </Button>
  );

  const components = {
    favorite: FavoriteButton,
    rating: RatingStars,
    bookmark: BookmarkButton,
    share: ShareButton,
    copy: CopyButton,
    download: DownloadButton,
  };

  const Component = components[type];
  
  return (
    <div className="inline-block">
      <Component />
      {children}
    </div>
  );
};

// Demo component showing all micro-interactions
const MicroInteractionsDemo = () => {
  const [favorited, setFavorited] = useState(false);
  const [rating, setRating] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Delightful Micro-Interactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Favorite</p>
            <MicroInteraction 
              type="favorite" 
              initialState={favorited}
              onInteraction={setFavorited}
            />
            <Badge variant="secondary" className="text-xs">
              {favorited ? 'Loved ❤️' : 'Show Love'}
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Rating</p>
            <MicroInteraction 
              type="rating" 
              initialState={rating}
              onInteraction={setRating}
            />
            <Badge variant="secondary" className="text-xs">
              {rating ? `${rating} stars` : 'Rate this'}
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Bookmark</p>
            <MicroInteraction 
              type="bookmark" 
              initialState={bookmarked}
              onInteraction={setBookmarked}
            />
            <Badge variant="secondary" className="text-xs">
              {bookmarked ? 'Saved' : 'Save for later'}
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Share</p>
            <MicroInteraction type="share" />
            <Badge variant="secondary" className="text-xs">
              Share with team
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Copy</p>
            <MicroInteraction type="copy" />
            <Badge variant="secondary" className="text-xs">
              Copy command
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Download</p>
            <MicroInteraction type="download" />
            <Badge variant="secondary" className="text-xs">
              Download config
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MicroInteraction;
export { MicroInteractionsDemo };


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, Flag, User, Shield, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: string;
  user: {
    name: string;
    verified: boolean;
    tier: 'enterprise' | 'startup' | 'creative';
    totalRentals: number;
  };
  rating: number;
  title: string;
  content: string;
  workload: string;
  duration: string;
  verified: boolean;
  helpful: number;
  date: string;
  tags: string[];
}

interface UserReviewsProps {
  gpuId: string;
  averageRating: number;
  totalReviews: number;
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      verified: true,
      tier: 'startup',
      totalRentals: 23
    },
    rating: 5,
    title: "Perfect for fine-tuning LLMs",
    content: "Used this for fine-tuning a 7B parameter model. The setup was incredibly smooth and the performance was exactly as advertised. Zero downtime during my 3-day training run.",
    workload: "AI Training",
    duration: "72 hours",
    verified: true,
    helpful: 12,
    date: "2024-01-15",
    tags: ["reliable", "fast-setup", "great-support"]
  },
  {
    id: "2",
    user: {
      name: "Sarah Kim",
      verified: true,
      tier: 'creative',
      totalRentals: 8
    },
    rating: 4,
    title: "Excellent for Blender renders",
    content: "Rendered a complex architectural visualization in half the time of my local setup. Only minor issue was initial driver setup, but support helped within 10 minutes.",
    workload: "3D Rendering",
    duration: "6 hours",
    verified: true,
    helpful: 8,
    date: "2024-01-10",
    tags: ["fast-rendering", "good-support", "cost-effective"]
  }
];

const UserReviews = ({ gpuId, averageRating, totalReviews }: UserReviewsProps) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const getUserBadgeColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'startup': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            User Reviews
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Verified Reviews Only
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(averageRating)}
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">({totalReviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Write Review Section */}
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="w-full"
          >
            Write a Review
          </Button>
          
          {showWriteReview && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
              <div>
                <label className="text-sm font-medium">Your Rating</label>
                <div className="mt-1">
                  {renderStars(rating, true, setRating)}
                </div>
              </div>
              <Textarea
                placeholder="Share your experience with this GPU..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button size="sm">Submit Review</Button>
                <Button size="sm" variant="outline" onClick={() => setShowWriteReview(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Reviews List */}
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user.name}</span>
                      {review.user.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      )}
                      <Badge variant="outline" className={getUserBadgeColor(review.user.tier)}>
                        {review.user.tier}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.user.totalRentals} rentals • {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  {review.verified && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{review.content}</p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span>Workload: {review.workload}</span>
                  <span>Duration: {review.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-auto p-1">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-1">
                    <Flag className="h-3 w-3 mr-1" />
                    Report
                  </Button>
                </div>
              </div>

              <Separator />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserReviews;

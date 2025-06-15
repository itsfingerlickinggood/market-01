
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Search, 
  Plus,
  ThumbsUp,
  MessageCircle,
  Clock,
  Pin,
  Award
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    tier: 'enterprise' | 'startup' | 'creative';
    reputation: number;
  };
  category: 'setup-help' | 'workload-optimization' | 'provider-reviews' | 'general';
  replies: number;
  likes: number;
  isPinned: boolean;
  isAnswered: boolean;
  createdAt: string;
  tags: string[];
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Best GPU for fine-tuning LLaMA 70B on a budget?",
    content: "Looking for recommendations on the most cost-effective GPU setup for fine-tuning large language models...",
    author: { name: "Alex Chen", tier: 'startup', reputation: 145 },
    category: 'workload-optimization',
    replies: 8,
    likes: 23,
    isPinned: false,
    isAnswered: true,
    createdAt: "2 hours ago",
    tags: ["llm", "fine-tuning", "budget"]
  },
  {
    id: "2",
    title: "📌 Complete Guide: Setting up Stable Diffusion WebUI",
    content: "Step-by-step tutorial for deploying Stable Diffusion with our one-click templates...",
    author: { name: "Sarah Kim", tier: 'creative', reputation: 892 },
    category: 'setup-help',
    replies: 34,
    likes: 156,
    isPinned: true,
    isAnswered: false,
    createdAt: "1 day ago",
    tags: ["stable-diffusion", "tutorial", "deployment"]
  }
];

const CommunityForum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: "all", name: "All Discussions", count: 156 },
    { id: "setup-help", name: "Setup Help", count: 45 },
    { id: "workload-optimization", name: "Workload Optimization", count: 67 },
    { id: "provider-reviews", name: "Provider Reviews", count: 28 },
    { id: "general", name: "General", count: 16 }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'startup': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Forum Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Forum
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Get help, share knowledge, and connect with the GPU community
              </p>
            </div>
            <Button onClick={() => setShowNewPost(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["stable-diffusion", "llm", "blender", "pytorch", "jupyter"].map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            {post.isAnswered && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Answered
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{post.author.name}</span>
                          <Badge variant="outline" className={getTierColor(post.author.tier)}>
                            {post.author.tier}
                          </Badge>
                          <Award className="h-3 w-3" />
                          <span>{post.author.reputation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Post title..." />
              <Textarea placeholder="Share your question or knowledge..." className="min-h-[120px]" />
              <div className="flex gap-2">
                <Button>Post</Button>
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;

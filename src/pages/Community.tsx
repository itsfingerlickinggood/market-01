
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import CommunityForum from "@/components/CommunityForum";
import VoiceAndTone from "@/components/VoiceAndTone";
import ProviderOnboarding from "@/components/ProviderOnboarding";

const Community = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
          <p className="text-muted-foreground">
            Connect with the GPU community, share knowledge, and contribute to the ecosystem
          </p>
        </div>

        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="onboarding">Provider Hub</TabsTrigger>
            <TabsTrigger value="voice">Style Guide</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="forum">
            <CommunityForum />
          </TabsContent>

          <TabsContent value="onboarding">
            <ProviderOnboarding />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceAndTone />
          </TabsContent>

          <TabsContent value="knowledge">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Knowledge Base Coming Soon</h2>
              <p className="text-muted-foreground">
                Comprehensive guides, tutorials, and best practices for GPU computing
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;

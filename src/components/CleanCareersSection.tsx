
const CleanCareersSection = () => {
  return (
    <div className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
              CAREERS
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Join Market01
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              We are seeking the most ambitious developers to join our team. 
              Please send us examples of your exceptional work.
            </p>
            <div className="pt-4">
              <button className="bg-transparent border border-border text-foreground px-6 py-3 rounded-md hover:bg-muted transition-colors font-medium">
                CAREERS
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background">
              <img 
                src="/lovable-uploads/fde9a1bc-d335-4962-8f7f-7dae4b04bcbc.png"
                alt="Join our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanCareersSection;

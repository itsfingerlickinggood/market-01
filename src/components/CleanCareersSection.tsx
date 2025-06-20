
const CleanCareersSection = () => {
  return (
    <div className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-5">
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
            <div className="pt-2">
              <button className="bg-transparent border border-border text-foreground px-6 py-3 rounded-md hover:bg-muted transition-colors font-medium">
                CAREERS
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanCareersSection;

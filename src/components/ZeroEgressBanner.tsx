
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, ArrowDownToLine, DollarSign, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ZeroEgressBanner = () => {
  return (
    <>
      {/* Hero Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-green-900">Zero Egress Fees</h3>
                  <Badge className="bg-green-600 text-white">FREE</Badge>
                </div>
                <p className="text-green-700 text-sm">
                  Download unlimited data from your instances at no extra cost - unlike AWS, GCP, or Azure
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  <Info className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ArrowDownToLine className="h-5 w-5 text-green-600" />
                    Why Zero Egress Fees Matter
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-red-50 border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2">Traditional Cloud (AWS/GCP/Azure)</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• $0.09/GB for data transfer</li>
                        <li>• Surprise bills for model downloads</li>
                        <li>• Hidden costs for dataset transfers</li>
                        <li>• Complex pricing tiers</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-green-50 border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Our Platform</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• $0.00/GB for data transfer</li>
                        <li>• Download models freely</li>
                        <li>• No surprise bandwidth charges</li>
                        <li>• Simple, transparent pricing</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Real Impact Examples</h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Downloading a 70B LLM (140GB):</span>
                        <div>
                          <span className="line-through text-red-600">AWS: $12.60</span>
                          <span className="ml-2 font-semibold text-green-600">Us: FREE</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Training dataset transfer (500GB):</span>
                        <div>
                          <span className="line-through text-red-600">GCP: $45.00</span>
                          <span className="ml-2 font-semibold text-green-600">Us: FREE</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly research data (1TB):</span>
                        <div>
                          <span className="line-through text-red-600">Azure: $90.00</span>
                          <span className="ml-2 font-semibold text-green-600">Us: FREE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">🎯 Who Benefits Most?</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li><strong>AI Researchers:</strong> Download large models and datasets without cost anxiety</li>
                      <li><strong>Startups:</strong> Predictable costs without surprise bandwidth bills</li>
                      <li><strong>Creative Professionals:</strong> Export high-resolution renders freely</li>
                      <li><strong>Data Scientists:</strong> Move datasets between environments without restrictions</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Compact Version for Cards */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
        <ArrowDownToLine className="h-3 w-3" />
        Zero Egress Fees
        <Badge variant="secondary" className="bg-green-600 text-white text-xs">FREE</Badge>
      </div>
    </>
  );
};

export default ZeroEgressBanner;

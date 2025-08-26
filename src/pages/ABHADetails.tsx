import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share2, Heart, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ABHADetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { aadharNumber, mobileNumber, abhaAddress, abhaNumber } = location.state || {};

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "ABHA card download will begin shortly",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Options",
      description: "ABHA details can be shared via email or SMS",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <div className="bg-success rounded-full p-2">
              <CheckCircle className="h-6 w-6 text-success-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ABHA Created Successfully</h1>
              <p className="text-muted-foreground">Your health account is now active</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <div className="bg-success/10 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
              <Heart className="h-12 w-12 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-success">Congratulations!</h2>
              <p className="text-muted-foreground">Your ABHA account has been created successfully</p>
            </div>
          </div>

          {/* ABHA Details Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>ABHA Account Details</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Active
                </Badge>
              </CardTitle>
              <CardDescription>
                Your unique health identity details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ABHA Number */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">ABHA Number</Label>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-mono text-lg font-semibold">{abhaNumber}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(abhaNumber, "ABHA Number")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* ABHA Address */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">ABHA Address</Label>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-mono">{abhaAddress}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(abhaAddress, "ABHA Address")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Linked Mobile */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Linked Mobile Number</Label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span>+91 {mobileNumber}</span>
                </div>
              </div>

              {/* Linked Aadhar */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Linked Aadhar</Label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span>{aadharNumber?.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3')}</span>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Account Status</Label>
                <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-success font-medium">Verified & Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button onClick={handleDownload} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download ABHA Card</span>
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share Details</span>
            </Button>
          </div>

          {/* Important Information */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-3">Important Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Your ABHA number is your unique 14-digit health ID</p>
              <p>• Use your ABHA address to access health services digitally</p>
              <p>• Keep your ABHA details secure and do not share with unauthorized persons</p>
              <p>• You can link multiple healthcare providers using this ABHA account</p>
              <p>• Your health records will be accessible across all linked providers</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Next Steps</h3>
            <div className="space-y-2 text-sm">
              <p>1. Download and save your ABHA card for future reference</p>
              <p>2. Link your existing health records with healthcare providers</p>
              <p>3. Use your ABHA for seamless healthcare services across India</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Label component (since it's used but not imported)
const Label = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);

export default ABHADetails;
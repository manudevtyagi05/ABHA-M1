import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, IdCard, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AadharVerification = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (aadharNumber.length !== 12) {
      toast({
        title: "Invalid Aadhar Number",
        description: "Please enter a valid 12-digit Aadhar number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: "OTP has been sent to your registered mobile number",
      });
      navigate("/create-abha/aadhar/otp", { state: { aadharNumber } });
      setIsLoading(false);
    }, 2000);
  };

  const formatAadharNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted.substring(0, 14); // 12 digits + 2 spaces
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/create-abha")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Methods
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Aadhar Verification</h1>
            <p className="text-muted-foreground">Enter your 12-digit Aadhar number</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-success text-success-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium">Method</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Aadhar</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  3
                </div>
                <span className="ml-2 text-sm text-muted-foreground">OTP</span>
              </div>
            </div>
          </div>

          {/* Aadhar Input Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <IdCard className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle>Enter Aadhar Number</CardTitle>
              <CardDescription>
                We'll send an OTP to your registered mobile number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input
                    id="aadhar"
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={formatAadharNumber(aadharNumber)}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '');
                      if (cleaned.length <= 12) {
                        setAadharNumber(cleaned);
                      }
                    }}
                    className="text-center text-lg tracking-wider"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter your 12-digit Aadhar number
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || aadharNumber.length !== 12}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Send OTP</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Your data is secure</p>
                <p className="text-muted-foreground">
                  Your Aadhar number is encrypted and used only for verification purposes as per UIDAI guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AadharVerification;
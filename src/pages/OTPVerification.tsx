import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MessageSquare, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const aadharNumber = location.state?.aadharNumber || "";

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Verification Successful",
        description: "Mobile number verified successfully",
      });
      
      // Simulate mobile number match check
      const isSameMobile = Math.random() > 0.5; // Random for demo
      
      if (isSameMobile) {
        navigate("/create-abha/address-selection", { 
          state: { aadharNumber, mobileNumber, isSameMobile: true } 
        });
      } else {
        navigate("/create-abha/mobile-verification", { 
          state: { aadharNumber, mobileNumber, isSameMobile: false } 
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOTP = () => {
    setResendCooldown(30);
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your mobile number",
    });
  };

  const formatMobileNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.substring(0, 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/create-abha/aadhar")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Aadhar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">OTP Verification</h1>
            <p className="text-muted-foreground">Verify your mobile number and enter OTP</p>
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
                <div className="bg-success text-success-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium">Aadhar</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium">OTP</span>
              </div>
            </div>
          </div>

          {/* OTP Verification Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle>Verify OTP & Mobile</CardTitle>
              <CardDescription>
                Enter the OTP sent to your registered mobile number and confirm your mobile number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(formatMobileNumber(e.target.value))}
                    className="text-center text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '');
                      if (cleaned.length <= 6) {
                        setOtp(cleaned);
                      }
                    }}
                    className="text-center text-lg tracking-wider"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Enter the 6-digit OTP
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={handleResendOTP}
                      disabled={resendCooldown > 0}
                      className="p-0 h-auto"
                    >
                      {resendCooldown > 0 ? (
                        <span className="text-muted-foreground">Resend in {resendCooldown}s</span>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="h-3 w-3" />
                          <span>Resend OTP</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || otp.length !== 6 || mobileNumber.length !== 10}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Aadhar: {aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OTPVerification;
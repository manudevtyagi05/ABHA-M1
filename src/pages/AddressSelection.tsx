import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { aadharNumber, mobileNumber } = location.state || {};

  // Mock ABHA address suggestions
  const addressSuggestions = [
    "rahul.sharma@abha",
    "rahul.s.1990@abha", 
    "r.sharma.delhi@abha",
    "rahul1990@abha",
    "sharma.rahul@abha"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddress) {
      toast({
        title: "Select ABHA Address",
        description: "Please select an ABHA address to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "ABHA Created Successfully",
        description: "Your ABHA account has been created and linked",
      });
      navigate("/abha-details", { 
        state: { 
          aadharNumber, 
          mobileNumber, 
          abhaAddress: selectedAddress,
          abhaNumber: "12-3456-7890-1234" // Mock ABHA number
        } 
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Select ABHA Address</h1>
            <p className="text-muted-foreground">Choose your preferred ABHA address</p>
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
                <span className="ml-2 text-sm font-medium">Verified</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="ml-2 text-sm font-medium">Address</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  5
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>

          {/* Address Selection Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle>Choose ABHA Address</CardTitle>
              <CardDescription>
                Select one of the suggested ABHA addresses or create a custom one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  <div className="space-y-3">
                    {addressSuggestions.map((address, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={address} id={address} />
                        <Label 
                          htmlFor={address} 
                          className="flex-1 cursor-pointer font-mono text-sm"
                        >
                          {address}
                        </Label>
                        {selectedAddress === address && (
                          <Check className="h-4 w-4 text-success" />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !selectedAddress}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating ABHA...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>Create ABHA Account</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border">
            <div className="text-sm space-y-2">
              <p><span className="font-medium">Mobile:</span> {mobileNumber}</p>
              <p><span className="font-medium">Aadhar:</span> {aadharNumber?.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddressSelection;
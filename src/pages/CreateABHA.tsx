import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Fingerprint, IdCard } from "lucide-react";

const CreateABHA = () => {
  const navigate = useNavigate();

  const verificationOptions = [
    {
      id: "aadhar",
      title: "Via Aadhar Number",
      description: "Use your 12-digit Aadhar number for quick verification",
      icon: IdCard,
      route: "/create-abha/aadhar",
      color: "primary"
    },
    {
      id: "biometric",
      title: "Via Biometric",
      description: "Use fingerprint or iris scan for secure authentication",
      icon: Fingerprint,
      route: "/create-abha/biometric",
      color: "success"
    },
    {
      id: "driving-license",
      title: "Via Driving License",
      description: "Use your driving license for identity verification",
      icon: CreditCard,
      route: "/create-abha/driving-license",
      color: "warning"
    }
  ];

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
          <div>
            <h1 className="text-2xl font-bold">Create ABHA Account</h1>
            <p className="text-muted-foreground">Choose your preferred verification method</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Choose Method</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  2
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Verification</span>
              </div>
              <div className="w-16 h-px bg-border"></div>
              <div className="flex items-center">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  3
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>

          {/* Verification Options */}
          <div className="grid md:grid-cols-3 gap-6">
            {verificationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card 
                  key={option.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm group"
                  onClick={() => navigate(option.route)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`bg-${option.color}/10 rounded-full p-4 group-hover:bg-${option.color}/20 transition-colors`}>
                        <IconComponent className={`h-8 w-8 text-${option.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription className="text-center">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full" variant="outline">
                      Select Method
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Information Section */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-3">Important Information</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>• Ensure you have a valid government-issued ID for verification</p>
              <p>• Mobile number linked to your chosen ID will be used for OTP verification</p>
              <p>• The process may take 5-10 minutes to complete</p>
              <p>• Your ABHA number will be generated upon successful verification</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateABHA;
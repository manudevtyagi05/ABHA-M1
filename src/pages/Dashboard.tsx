import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ShieldCheck, Heart, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-full p-2">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ABHA Portal</h1>
              <p className="text-sm text-muted-foreground">Health Account Management</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to ABHA Portal</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your Ayushman Bharat Health Account. Create new ABHA or verify existing accounts securely.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Create ABHA Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary/20 transition-colors">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Create ABHA</CardTitle>
                <CardDescription className="text-center">
                  Create a new Ayushman Bharat Health Account with multiple verification options
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/create-abha")}
                >
                  Start Creation Process
                </Button>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Via Aadhar Number</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Via Biometric</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Via Driving License</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verify ABHA Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-success/10 rounded-full p-4 group-hover:bg-success/20 transition-colors">
                    <ShieldCheck className="h-8 w-8 text-success" />
                  </div>
                </div>
                <CardTitle className="text-xl">Verify ABHA</CardTitle>
                <CardDescription className="text-center">
                  Verify an existing ABHA account and access your health records
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/verify-abha")}
                >
                  Verify Account
                </Button>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <span>Quick Verification</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <span>Secure Access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <span>Health Records</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-3">About ABHA</h3>
            <p className="text-muted-foreground leading-relaxed">
              The Ayushman Bharat Health Account (ABHA) is a unique 14-digit health ID that serves as a 
              digital health identity for every Indian citizen. It enables seamless access to health 
              services across different healthcare providers and maintains a comprehensive health record.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
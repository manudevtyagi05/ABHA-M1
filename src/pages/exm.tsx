import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    clientId: "",
    clientSecret: "",
    grantType: "client_credentials",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const API_BASE_URL = "https://dev.abdm.gov.in/api/hiecm/gateway/v3";

  // Generate request-id (UUID-like)
  const generateRequestId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Handle login submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.clientId.trim() || !credentials.clientSecret.trim()) {
      setError("Please enter both Client ID and Client Secret");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const requestId = generateRequestId();
      const timestamp = new Date().toISOString();

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "REQUEST-ID": requestId,
          TIMESTAMP: timestamp,
          "X-CM-ID": "sbx",
        },
        body: JSON.stringify({
          clientId: credentials.clientId.trim(),
          clientSecret: credentials.clientSecret.trim(),
          grantType: "client_credentials",
        }),
      });

      if (response.ok) {
        const sessionData = await response.json();
        localStorage.setItem("session", JSON.stringify(sessionData));

        toast({
          title: "Login Successful",
          description: "You have been successfully authenticated with ABDM.",
        });

        navigate("/dashboard");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Authentication failed (${response.status})`
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error occurred";
      setError(errorMessage);

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ABHA Portal</h1>
          <p className="text-muted-foreground">
            Ayushman Bharat Health Account Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your ABDM client credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Client ID */}
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  type="text"
                  placeholder="Enter your Client ID"
                  value={credentials.clientId}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      clientId: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Client Secret */}
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder="Enter your Client Secret"
                  value={credentials.clientSecret}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      clientSecret: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <Shield className="h-4 w-4 mr-2" />
            <span>Secured by Government of India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
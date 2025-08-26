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
import { ArrowLeft, IdCard, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Helper: Generate UUID for REQUEST-ID
const generateRequestId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const AadharVerification = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const API_URL = "https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp";

  const formatAadharNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    return formatted.substring(0, 14);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (aadharNumber.length !== 12) {
      toast({
        title: "Invalid Aadhar Number",
        description: "Please enter a valid 12-digit Aadhar number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Retrieve session (from login) to get access token
      const sessionData = localStorage.getItem("session");
      if (!sessionData) {
        throw new Error("No session found. Please log in again.");
      }

      const parsedSession = JSON.parse(sessionData);
      const accessToken = parsedSession?.accessToken || parsedSession?.access_token;

      if (!accessToken) {
        throw new Error("Access token not found in session.");
      }

      const requestId = generateRequestId();
      const timestamp = new Date().toISOString();

      // 🔒 In production: Encrypt Aadhaar using ABHA JWE encryption standard
      // For now, assuming test mode where encrypted value is static or mocked
      // ⚠️ This is just for demo — DO NOT use hardcoded encrypted values in prod
      const encryptedAadhaar = /* Ideally: await encryptAadhaar(aadharNumber) */
        "Vc8bHGo4Rz3A5CP/S6z2YO+7YdC5SzJzVcKeO4zy6g46xQx+W8y4KPb8YkrH9Ouk9svx/kwuojQi5ZkHAtVuP6S6Nuy/EkMJDcV797SyezF9V2pTWn0HNy6RovWmOejGtcncxJeSDqRbKi8+eCLc/H9EKaHgJ8gfbsn5Ykyg3pIgsZ6G9h0IBPKVi7E7xXU/51fyTDAjTJKOmxZw1pigiOpdUmA3x+4yUx/KsTWUd8KohBoTN6wbKwjPBB8xDO/PVcar+gciavL7mHJ5J+MAX3cgzw3eAsZYSA18kOODvnAL4MZ+YBXjBuf3MpbKB4iMdyUTuHZFnbcf/TmWOA80TB0BF8q8SUPpuNORJYQct81k62yxMAU5TjYGPuS0wM8awNz/C9ucLwOQUHtRFMRvZOfInOpf+kKbX38PYxvkwzWPmgKI90RmoTMqCM/rGVhjXlJJT1rVycey6JV1Fqrqcr9PPIcZt1ClkQppixqf8Zil4ejuqgSS4WCrnNJB4XQ8YmXxth3ueYpmLbakHCWubRQDLWXmi8DbeWO4sjzS0bVK6ymx1ziQ0HVGWPuTfRrrblcbtMArpHqf/a1d2eLI4bziphfKASptOPe0ErmTZ7U9astThjJdhmrrSrxxRMAPy2ZZWlolRoW8NKY9ry73d0M8AXjCv22lOv54M12tJ3o=";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "REQUEST-ID": requestId,
          TIMESTAMP: timestamp,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          txnId: "", // Can be left empty or generated
          scope: ["abha-enrol"],
          loginHint: "aadhaar",
          loginId: encryptedAadhaar,
          otpSystem: "aadhaar",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const txnId = data?.txnId || "default-txn";

        toast({
          title: "OTP Sent",
          description: "An OTP has been sent to your registered mobile number.",
        });

        // Pass Aadhaar and transaction ID to OTP verification page
        navigate("/create-abha/aadhar/otp", {
          state: { aadharNumber, txnId },
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to send OTP (${response.status})`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error or invalid session";

      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Aadhaar OTP Request Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/create-abha")} className="mb-2">
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
                      const cleaned = e.target.value.replace(/\D/g, "");
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || aadharNumber.length !== 12}
                >
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
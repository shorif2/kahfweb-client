import React, { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading, isSuccess, isError, error }] =
    useForgetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      const timer = setTimeout(() => {
        navigate("/get-started");
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await forgetPassword({ email }).unwrap();
    } catch (err) {
      console.error("Failed to send reset email:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              to="/get-started"
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
          </div>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {isSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  Password reset email sent successfully! Please check your
                  email.
                </AlertDescription>
              </Alert>
            )}

            {isError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error &&
                  "data" in error &&
                  typeof error.data === "object" &&
                  error.data &&
                  "message" in error.data
                    ? String(error.data.message)
                    : "Failed to send reset email. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/get-started"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordForm;

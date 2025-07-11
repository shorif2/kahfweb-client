import React, { useState } from "react";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
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
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      await resetPassword({ token, newPassword }).unwrap();
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate("/get-started");
      }, 2000);
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                Invalid reset link. Please request a new password reset.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Request New Reset Link
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {isSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  Password reset successfully! Redirecting to login...
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
                    : "Failed to reset password. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !newPassword || !confirmPassword}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
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

export default ResetPasswordForm;

import React, { useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
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

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password must be different from current password");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      // Clear form on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Failed to change password:", err);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password. Make sure to use a strong password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
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
                Password changed successfully! A confirmation email has been
                sent.
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
                  : "Failed to change password. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading || !currentPassword || !newPassword || !confirmPassword
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            View and manage your account information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Information</h3>

            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={user?.name || ""} disabled />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Account Type</Label>
              <Input
                id="role"
                value={user?.role === "admin" ? "Administrator" : "Customer"}
                disabled
              />
            </div>
          </div>

          {/* Password Change Form */}
          <div className="space-y-4">
            <ChangePasswordForm />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-500">
            For security reasons, changing your email address requires
            contacting customer support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;

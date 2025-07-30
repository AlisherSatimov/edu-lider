"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/store";
import { USER_ROLES, ROLE_LABELS } from "@/lib/constants";
import { GraduationCap } from "lucide-react";

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole as keyof typeof USER_ROLES);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome to Edu-Lider</CardTitle>
          <CardDescription>Please select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Select Role
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(USER_ROLES).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {ROLE_LABELS[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={!selectedRole}
          >
            Continue
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>This is a demo application.</p>
            <p>Select any role to explore the system.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

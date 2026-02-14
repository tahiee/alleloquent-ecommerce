"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

type AuthError = {
  code?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, signOut } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signIn(email, password);
      const idTokenResult = await userCredential.user.getIdTokenResult(true);
      const isAdmin = !!idTokenResult.claims.admin;

      if (!isAdmin) {
        await signOut();
        setError("Your account is not an admin account.");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);
      const authError = err as AuthError;

      if (
        authError.code === "auth/invalid-credential" ||
        authError.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
      } else if (authError.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (authError.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 px-4 py-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Card className="w-full max-w-md relative shadow-2xl border-2 border-orange-100">
        {/* Header with Logo/Icon */}
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <CardDescription className="text-base">
              Alleloquent Farms - Dashboard Access
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-orange-600" />
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alleloquent.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 border-2 focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-orange-600" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-12 border-2 focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg shadow-orange-500/30 transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Sign In to Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Not an admin?{" "}
                <Link
                  href="/"
                  className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                >
                  Go to Store
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                Protected by Firebase Authentication
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-gray-600">
          Need help? Contact system administrator
        </p>
      </div>
    </div>
  );
}

import { GitHubSignInButton } from "@/components/ui/auth/auth-button";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-8">
          Sign in to your account
        </h3>
        <div className="space-y-4">
          <GitHubSignInButton />
        </div>
      </div>
    </div>
  );
}

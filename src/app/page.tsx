import SignInButton from "@/components/ui/auth/sign-in-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Pluto Finance</h1>
      <div className="flex gap-4">
        <SignInButton />
      </div>
    </main>
  );
}

"use client";

import SignInButton from "@/components/ui/auth/sign-in-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PieChart, Users, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const features = [
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "Account Monitoring",
      description:
        "Track all your bank accounts and investment portfolios in one place",
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "Smart Categorization",
      description:
        "Automatically categorize your expenses with machine learning",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Family Sharing",
      description:
        "Manage family finances together with secure account sharing",
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Visual Insights",
      description:
        "Get clear visualizations of your spending patterns and financial health",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <div className="max-w-4xl w-full text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Pluto Finance</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your all-in-one personal finance tracking solution
        </p>

        {session ? (
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/accounts">Manage Accounts</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <SignInButton />
            <Button asChild variant="outline">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

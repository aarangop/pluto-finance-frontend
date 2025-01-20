import { Navbar } from "@/components/shared/navbar";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Pluto Finance",
  description: "Manage your personal and family finances",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}

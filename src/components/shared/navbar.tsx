"use client";

import { useSession } from "next-auth/react";
import { SignOutButton } from "../ui/auth/sign-out-button";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Pluto</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {session?.user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

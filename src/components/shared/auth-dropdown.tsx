"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AuthDropdown() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image || undefined}
                  alt={session.user?.name || "User Avatar"}
                />
                <AvatarFallback>
                  {session.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex-col items-start">
              <div className="font-medium">{session.user?.name}</div>
              <div className="text-sm text-muted-foreground">
                {session.user?.email}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/account">Account</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!session && (
        <Button onClick={() => signIn("cognito")} variant="default" size="sm">
          Sign in
        </Button>
      )}
    </div>
  );
}

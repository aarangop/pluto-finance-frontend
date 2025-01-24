"use client";

import { signIn } from "next-auth/react";
import { Button } from "../button";

export default function SignInButton() {
  return (
    <Button
      onClick={() => signIn()}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Sign In
    </Button>
  );
}

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import AuthDropdown from "./auth-dropdown";

interface NavbarProps {}

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pr-4">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
            <Link href="/reports" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Reports
              </NavigationMenuLink>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <AuthDropdown />
      </div>
    </div>
  );
}

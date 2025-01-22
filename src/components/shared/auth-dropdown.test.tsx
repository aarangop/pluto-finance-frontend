import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import AuthDropdown from "./auth-dropdown";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

import { signIn, signOut, useSession } from "next-auth/react";

describe("AuthDropdown", () => {
  it("shows sign in button when user is not authenticated", () => {
    const mockUseSession = useSession as Mock;
    mockUseSession.mockReturnValue({ data: null });

    render(<AuthDropdown />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledWith("cognito");
  });

  it("shows user info and dropdown when authenticated", () => {
    const mockSession = {
      user: {
        name: "John Doe",
        email: "john@example.com",
        image:
          "https://gravatar.com/avatar/e3dfafb037a022bcdf6594843540ac1d?s=400&d=robohash&r=x",
      },
    };

    const mockUseSession = useSession as Mock;
    mockUseSession.mockReturnValue({ data: mockSession });

    render(<AuthDropdown />);

    // Check if avatar is rendered
    expect(screen.getByRole("img", { name: "John Doe" })).toBeInTheDocument();

    // Open dropdown
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    // Check dropdown content
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    // Test sign out
    const signOutButton = screen.getByText("Sign out");
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });

  it("shows initials in avatar when no image is provided", () => {
    const mockSession = {
      user: {
        name: "John Doe",
        email: "john@example.com",
        image: null,
      },
    };

    const mockUseSession = useSession as Mock;
    mockUseSession.mockReturnValue({ data: mockSession });

    render(<AuthDropdown />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});

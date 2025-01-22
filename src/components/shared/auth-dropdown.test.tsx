import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import AuthDropdown from "./auth-dropdown";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

import { signIn, useSession } from "next-auth/react";

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

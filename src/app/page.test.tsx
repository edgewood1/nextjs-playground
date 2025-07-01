import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Import the whole library
import Home from './page'; // This is now an async Server Component
import { MantineProvider } from '@mantine/core';

// Mock the auth utilities
import { auth, signOut } from '@/lib/auth';

// Mock Next.js Link component for testing, as it's not available in a standard Jest environment.
// This pattern with a named function and displayName satisfies ESLint rules.
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return <a href={href} {...rest}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock the auth module.
jest.mock('@/lib/auth', () => ({
  __esModule: true, // Handle ES module interop
  auth: jest.fn(),
  signOut: jest.fn(),
}));

describe('Home Component', () => {
  // Helper function to wrap the component in the necessary provider
  // It's now async because Home is a Server Component
  const renderHome = async () => {
    return render(
      <MantineProvider>
        {await Home()}
      </MantineProvider>
    );
  };

  beforeEach(() => {
    // Clear mock history before each test
    (auth as jest.Mock).mockClear();
    (signOut as jest.Mock).mockClear();
  });

  it('renders the main welcome title and Spanish link', async () => {
    (auth as jest.Mock).mockResolvedValue(null); // Assume logged-out for this generic test
    await renderHome();
    const title = screen.getByText(/Welcome to the Playground/i);
    expect(title).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Go to Spanish Verbs/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/spanish');
  });

  it('shows Login and Signup buttons when user is not logged in', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    await renderHome();

    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Signup/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Logout/i })).not.toBeInTheDocument();
  });

  it('shows a Logout button when user is logged in', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } });
    await renderHome();

    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Signup/i })).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Import the whole library
import Home from './page';
import { MantineProvider } from '@mantine/core';

// Mock Next.js Link component for testing, as it's not available in a standard Jest environment.
// This pattern with a named function and displayName satisfies ESLint rules.
jest.mock('next/link', () => {
  const MockLink = function MockLink({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href} {...rest}>{children}</a>;
  };
  (MockLink as React.FC).displayName = 'MockLink';
  return MockLink;
});

describe('Home Component', () => {
  // Helper function to wrap the component in the necessary provider
  const renderHome = () => {
    return render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );
  };

  it('renders the main welcome title', () => {
    renderHome();
    const title = screen.getByText(/Welcome to the Playground/i);
    expect(title).toBeInTheDocument();
  });

  it('renders a link to the Spanish page', () => {
    renderHome();
    const link = screen.getByRole('link', { name: /Go to Spanish Verbs/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/spanish');
  });


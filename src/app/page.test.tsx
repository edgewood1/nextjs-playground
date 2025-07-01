import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Import the whole library
import Home from './page';
import { MantineProvider } from '@mantine/core';

// Mock Next.js Link component for testing, as it's not available in a standard Jest environment.
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children, href, ...rest }: { children: React.ReactNode; href: string;[key: string]: any }) => {
    // The `passHref` and `component="a"` props on the Button inside Link
    // mean we should render an `a` tag.
    return <a href={href} {...rest}>{children}</a>;
  };
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
});

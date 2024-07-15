import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Import the whole library
import Home from './page'; // Assuming your file is named page.tsx

describe('Home Component', () => {

    it('renders the "Get started" message', () => {
        render(<Home />);
        const message = screen.getByText(/Get started by editing/i); // Case-insensitive match
        expect(message).toBeInTheDocument();
    });

    it('renders the Next.js logo with alt text', () => {
        render(<Home />);
        const nextjsLogo = screen.getByAltText('Next.js Logo');
        expect(nextjsLogo).toBeInTheDocument();
    });

    it('renders links to Next.js resources', () => {
      render(<Home />);
        const links = screen.getAllByRole('link', { name: /(Docs|Learn|Templates|Deploy)/i }); // Only select the 4 main links
        // const links = screen.getAllByRole('link'); // Get all links
        expect(links).toHaveLength(4); // Should be 4 links: Docs, Learn, Templates, Deploy
        expect(links[0]).toHaveAttribute('href', 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'); // Check the href of the first link
    });
});

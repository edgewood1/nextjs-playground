"use client";

import React from 'react';
import AudioPlayer from '../sections/Music'; // Adjusted path to Music.tsx
import { MantineProvider, createTheme } from '@mantine/core'; // Optional: for consistent Mantine styling

// Optional: You can reuse your existing theme or define a new one
const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

export default function MusicPage() {
  return (
    // Wrapping with MantineProvider is optional, but good for consistency if needed.
    // You might also want to include your <Nav /> component here or other layout elements.
    <MantineProvider theme={theme}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Music Player</h1>
        <AudioPlayer />
      </div>
    </MantineProvider>
  );
}
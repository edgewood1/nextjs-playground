"use client"

import classes from './HeaderSimple.module.css'; // Reuse the same CSS module for styling
import {
  Anchor,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'; // Import Link for client-side navigation
import React from 'react';

export function DashboardNav() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  // Define the specific links for the dashboard
  const dashboardLinks = [
    { href: '/', label: 'Home' }, // Link back to the landing page
    { href: '/music', label: 'Music' },
    { href: '/spanish', label: 'Spanish' },
    { href: '/journal', label: 'Journal', disabled: true }, // Under construction
    { href: '/finance', label: 'Finance', disabled: true }, // Under construction
  ];

  // Generate navigation links for both desktop and drawer
  const navLinks = dashboardLinks.map((link) => (
    <Anchor
      component={Link} // Use Next.js Link for client-side navigation
      href={link.href}
      key={link.label}
      className={classes.link} // Reuse the styling class
      data-disabled={link.disabled || undefined} // Add data attribute for potential custom disabled styling in CSS
      onClick={(event) => {
        if (link.disabled) {
          event.preventDefault(); // Prevent navigation if the link is disabled
        } else {
           // Close the drawer when a link is clicked (only relevant for drawer links)
           closeDrawer();
        }
      }}
      style={{ // Basic inline styles to indicate disabled state
        pointerEvents: link.disabled ? 'none' : undefined, // Disable pointer events
        opacity: link.disabled ? 0.5 : undefined, // Reduce opacity
        cursor: link.disabled ? 'not-allowed' : undefined, // Change cursor
      }}
    >
      {link.label}
      {/* Optional: Add a text indicator for under construction */}
      {link.disabled && <Text span size="xs" c="dimmed" ml={5}>(UC)</Text>}
    </Anchor>
  ));

  return (
    <Box pb={120}> {/* Add padding below the header */}
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Replace with your app title or logo */}
          <Text fw={500}>Amplify Dashboard</Text> {/* Specific title for dashboard */}

          {/* Desktop Navigation Links */}
          <Group h="100%" gap={0} visibleFrom="sm">
            {navLinks}
          </Group>

          {/* Hamburger Burger Icon (visible on smaller screens) */}
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%" // You can adjust the size ('sm', 'md', etc.)
        padding="md"
        title="Navigation" // Title for the drawer header
        hiddenFrom="sm" // Hide the drawer on larger screens
        zIndex={1000000} // Ensure the drawer is above other content
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md"> {/* Make drawer content scrollable */}
          <Divider my="sm" />

          {/* Drawer Navigation Links */}
          {navLinks}

          <Divider my="sm" />

          {/* Add any other drawer content here if needed */}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
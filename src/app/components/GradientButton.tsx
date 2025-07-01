"use client"; // Add this directive

import React from "react";
import { Button as MantineButton, ButtonProps as MantineButtonProps, MantineTheme, useMantineTheme } from '@mantine/core';

interface CustomButtonProps extends Omit<React.ComponentProps<typeof MantineButton>, 'onClick' | 'children' | 'variant' | 'styles' | 'sx'> {
onClick: (React.MouseEventHandler<HTMLButtonElement>)
  // children: React.ReactNode;
  
}

function GradientButton({ children, onClick, ...rest }: CustomButtonProps) {
  const theme = useMantineTheme();
  console.log('theme', theme)
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
    onClick(event); // Call the original onClick handler
  };

  const defaultGradient = { from: '#B2FEFA', to: '#0ED2F7', deg: 90 };
  const hoverGradient = { from: '#0ED2F7', to: '#B2FEFA', deg: 90 };

    // Helper function to manually create the gradient string
    const createGradientString = (gradient: { from: string; to: string; deg: number }) => {
      return `linear-gradient(${gradient.deg}deg, ${gradient.from} 0%, ${gradient.to} 100%)`;
    };
  
  // Using a theme color as a placeholder for the original "dark-brown"
  const regularTextColor = theme.colors.dark[3]; 
  const clickedTextColor = theme.black;

  return (
    // The outer div wrapper has been removed.
    // Parent components (like Question.tsx) should handle the layout and centering.
    <MantineButton
      onClick={handleClick}
      sx={{
        // background: theme.fn.gradient(defaultGradient),
        background: createGradientString(defaultGradient), // Use manual gradient string

        border: "none",
        color: isClicked ? clickedTextColor : regularTextColor,
        padding: "12px 24px",
        fontSize: "16px",
        margin: "8px", // Intrinsic margin for spacing
        borderRadius: theme.radius.sm, // '4px'
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)", // Original specific shadow
        transition: "all 0.3s ease",
        zIndex: 10, // Preserved from the original wrapper div, applied to the button itself

        '&:hover': {
          background: createGradientString(defaultGradient), // Use manual gradient string

        },
        '&:active': {
          // Replicate original (commented out in source) active styles
          boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          transform: 'translateY(1px)',
        },
      }}
      {...rest}
    >
      {children}
    </MantineButton>
  );
}

export default GradientButton;

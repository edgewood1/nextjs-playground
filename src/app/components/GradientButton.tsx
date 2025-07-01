"use client";

import {
  Button as MantineButton,
  ButtonProps,
  MantineGradient,
} from "@mantine/core";
import React, { ReactNode } from "react";

// Define a default gradient to be used if none is provided
const defaultGradient: MantineGradient = { from: "indigo", to: "cyan", deg: 90 };

// Define the props specific to our custom button
type GradientButtonCustomProps = {
  children: ReactNode;
  gradient?: MantineGradient;
};

// Combine our custom props with all standard Mantine ButtonProps.
// This pattern is more robust and avoids issues with complex underlying types.
type GradientButtonProps = GradientButtonCustomProps & Omit<ButtonProps, keyof GradientButtonCustomProps>;

const GradientButton = ({
  children,
  gradient = defaultGradient,
  ...rest
}: GradientButtonProps) => {
  return (
    <MantineButton variant="gradient" gradient={gradient} {...rest}>
      {children}
    </MantineButton>
  );
};

export default GradientButton;
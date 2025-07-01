"use client";

import {
  Button as MantineButton,
  ButtonProps,
  MantineGradient,
} from "@mantine/core";
import React, { ReactNode } from "react";

// Define a default gradient to be used if none is provided
const defaultGradient: MantineGradient = { from: "indigo", to: "cyan", deg: 90 };

// Extend Mantine's ButtonProps to create our own, omitting props we will set ourselves.
interface GradientButtonProps extends Omit<ButtonProps, "variant" | "gradient"> {
  children: ReactNode;
  gradient?: MantineGradient;
}

const GradientButton = ({
  children,
  gradient = defaultGradient,
  ...rest
}: GradientButtonProps) => {
  // Use the idiomatic variant="gradient" prop from Mantine v7
  return (
    <MantineButton variant="gradient" gradient={gradient} {...rest}>
      {children}
    </MantineButton>
  );
};

export default GradientButton;
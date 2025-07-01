"use client";

import { Button, ButtonProps } from '@mantine/core';
import React from 'react';

// Define the props for the component, extending Mantine's ButtonProps for flexibility.
interface Buttons2Props extends Omit<ButtonProps, 'onClick'> {
  text: React.ReactNode;
  handler: () => void;
  show: boolean;
}

export const Buttons2 = ({ text, handler, show, ...rest }: Buttons2Props) => {
  // Return null for cleaner conditional rendering instead of an empty fragment.
  if (!show) {
    return null;
  }

  return (
    <Button onClick={handler} {...rest}>{text}</Button>
  );
};
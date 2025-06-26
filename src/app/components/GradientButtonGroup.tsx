import GradientButton from './GradientButton'; // Import the custom GradientButton
import React from 'react';
import { Group } from '@mantine/core';

// It's good practice to type props
interface GradientButtonGroupProps {
  text: string[];
  handler: React.MouseEventHandler<HTMLButtonElement>;
  show?: boolean; // Make show optional, defaulting to true
}

export const GradientButtonGroup = ({ text, handler, show = true }: GradientButtonGroupProps) => {
    if (!show) {
        return null; // Return null for cleaner conditional rendering
    }

    return (
        <Group gap="10px"> {/* Use Mantine's Group component */}
             {text.map((t, index) => (
                <GradientButton onClick={handler} key={index}>
                    {t}
                </GradientButton>
            ))}
        </Group>
    );
};
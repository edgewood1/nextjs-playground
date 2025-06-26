"use client"; // Mark as Client Component

import React from "react";
import GradientButton from "./GradientButton";
import { Box, Text } from "@mantine/core";

interface CheckboxProps {
  items: string[];
  onSubmit: (values: string[]) => void;
}

function Checkboxes({ items, onSubmit }: CheckboxProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    onSubmit(selectedValues);
  };

  return (
    <>
    <Box ml={5}> {/* Use Mantine's Box with margin prop */}
      {items.map((item, index) => (
        <Box key={index} mb={5}> {/* Add some margin bottom for spacing */}
          <input
            type="checkbox"
            id={`option${index}`}
            value={item}
            checked={selectedValues.includes(item)}
            onChange={handleChange}
            style={{ marginRight: '5px' }} // Keep simple inline style for input or use Mantine's Checkbox
          />
              <Text
                component="label"
                htmlFor={`option${index}`}
                c="blue" // Mantine's color prop
                // pl={5} // Mantine's padding prop if needed, but input margin might be enough
              >
                {item}
              </Text>
            </Box>
      ))}
    </Box>
      <GradientButton onClick={handleSubmit}>Submit</GradientButton>
    </>
  );
}

export default Checkboxes;

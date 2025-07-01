"use client"; // Mark as Client Component

import React, { useState, MouseEventHandler } from "react";
import GradientButton from "./GradientButton";
import { Box, Checkbox, Group } from "@mantine/core";

interface CheckboxesProps {
  items: string[];
  onSubmit: (values: string[]) => void;
}

function Checkboxes({ items, onSubmit }: CheckboxesProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedValues((current) => [...current, value]);
    } else {
      setSelectedValues((current) => current.filter((item) => item !== value));
    }
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    onSubmit(selectedValues);
  };

  return (
    <>
      <Box>
        <Group>
          {items.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={selectedValues.includes(item)}
              onChange={(event) => handleChange(item, event.currentTarget.checked)}
            />
          ))}
        </Group>
      </Box>
      <GradientButton onClick={handleSubmit} mt="md">Submit</GradientButton>
    </>
  );
}

export default Checkboxes;

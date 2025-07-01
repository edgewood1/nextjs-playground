"use client"; // Mark as Client Component

import Checkboxes from "../components/Checkboxes";
import React from "react";
import { Stack } from "@mantine/core"; // Import Mantine's Stack
import { VerbsData, VerbConjugation } from "../types/verbs"; // Ensure VerbConjugation is imported
interface HeaderProps {
  setVerbs: React.Dispatch<React.SetStateAction<VerbConjugation[]>>;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  screen: string;
}

export const Header = (props: HeaderProps) => {
  const { setVerbs, setScreen } = props;

  const handleTenseSubmit = async (tenses: string[]) => {
    if (tenses.length === 0) return;
    console.log("fetching...");
    const response = await fetch(
      `/api/filter-verbs?tenses=${tenses.join(',')}&mood=Indicative`,
    );
    const fetchedVerbsData: VerbsData = await response.json();
    // Flatten the complex object from the API into a simple array of verbs.
    // This makes the data much easier to work with in other components.
    const verbsArray = Object.values(fetchedVerbsData).flat();
    setVerbs(verbsArray);
    if (verbsArray.length > 0) {
      setScreen("question");
    }
  };

  const tenses = ["Present", "Preterite", "Imperfect"];
  return (
    <Stack
      align="center"
      bg="white" // background color
      p="md"    // padding (Mantine spacing scale)
      style={{ width: "100%" }}
    >
      <Checkboxes items={tenses} onSubmit={handleTenseSubmit} />
    </Stack>
  );
};

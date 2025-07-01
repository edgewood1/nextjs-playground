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
  const [selectedTenses, setSelectedTenses] = React.useState<string[]>([]);

  const checkboxHandler = (e: string[]) => {
    console.log("fetching...");
    // const strings: string[] = e.join(",");

    setSelectedTenses(e);
  };

  // const checkboxHandler = async (e: string[]) => {

  //    // Join the array into a comma-separated string
  //   const response = await fetch(
  //     `/api/filter-verbs?tenses=${tensesString}&mood=Indicative`,
  //   );

  //   const verbs: VerbsData = await response.json(); // Type assertion for 'data'
  //   setVerbs(verbs);
  //   setScreen('question')

  // };
  
  React.useEffect(() => {
    const fetchData = async () => {
      if (selectedTenses.length === 0) return;
      console.log("fetching...");
      const response = await fetch(
        `/api/filter-verbs?tenses=${selectedTenses}&mood=Indicative`,
      );
      const fetchedVerbsData: VerbsData = await response.json();
      // Flatten the complex object from the API into a simple array of verbs.
      // This makes the data much easier to work with in other components.
      const verbsArray = Object.values(fetchedVerbsData).flat();
      setVerbs(verbsArray);
      if (verbsArray.length > 0) setScreen("question");
    };

    fetchData();
  }, [selectedTenses, setVerbs, setScreen]); // Added setVerbs and setScreen to dependencies
  // if (screen !== 'header') return <></>
  const tenses = ["Present", "Preterite", "Imperfect"];
  return (
    <Stack
      align="center"
      bg="white" // background color
      p="md"    // padding (Mantine spacing scale)
      style={{ width: "100%" }}
    >
      <Checkboxes items={tenses} onSubmit={checkboxHandler} />
    </Stack>
  );
};

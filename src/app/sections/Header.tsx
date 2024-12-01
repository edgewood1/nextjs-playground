import Checkboxes from "../components/Checkboxes";
import React from "react";
import { VerbsData } from "../types/verbs";

export const Header = (props: any) => {
  const { setVerbs } = props;
  const checkboxHandler = async (e: string[]) => {
    const tensesString = e.join(","); // Join the array into a comma-separated string
    const response = await fetch(
      `/api/filter-verbs?tenses=${tensesString}&mood=Indicative`,
    );

    const verbs: VerbsData = await response.json(); // Type assertion for 'data'

    console.log(verbs);
    setVerbs(verbs);
  };
  const tenses = ["Present", "Preterite", "Imperfect"];

  return (
    <div className="flex flex-col items-center bg-white p-4 w-full">
      <h1
        style={{
          color: "blue",
          margin: 0,
          fontWeight: "bold",
          fontSize: "2em",
        }}
      >
        Conjugation Practice
      </h1>
      <Checkboxes items={tenses} onSubmit={checkboxHandler} />
    </div>
  );
};

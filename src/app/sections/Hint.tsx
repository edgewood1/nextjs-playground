"use client"; // Mark as Client Component

import React from "react";
import GradientButton from "../components/GradientButton";
import { HintTable } from "../components/Table";
export const Hint = (props: any) => {
  const { questionObj, screen } = props;
  const [hint, setHint] = React.useState(0);
  const handleHint = () => {
    setHint((prevHint) => (prevHint + 1) % 3);
  };

  console.log("screen", screen);
  if (screen === "header") return <></>;
  return (
    <>
      <GradientButton onClick={handleHint}>hint</GradientButton>
      {hint === 1 && <HintTable questionObj={questionObj} />}
      {hint === 2 && <p>Hint 2</p>}
    </>
  );
};

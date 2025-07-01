"use client";

import React, { useState } from "react";
import { Button } from "@mantine/core";
import { HintTable } from "../components/Table";
import { QO } from "../types/verbs";

interface HintProps {
  questionObj: QO;
  screen: string;
}

export const Hint = ({ questionObj, screen }: HintProps) => {
  const [showHint, setShowHint] = useState(false);

  const handleHint = () => {
    setShowHint(!showHint);
  };

  if (screen === "header") {
    return null;
  }

  return (
    <>
      <Button onClick={handleHint} variant="light" size="xs" mt="md">
        {showHint ? "Hide Hint" : "Show Hint"}
      </Button>
      {showHint && <HintTable questionObj={questionObj} />}
    </>
  );
};
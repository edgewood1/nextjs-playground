"use client";

import React, { useState } from "react";

import Body from "../../sections/Body"; // Adjusted path
import { MyContext } from "../../context"; // Adjusted path
import { VerbsData, VerbConjugation } from "../../types/verbs"; // Adjusted path, ensure VerbConjugation is exported

 

export default function SpanishPage() {
  const [currentTense, setCurrentTense] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  // Change verbs state to be an array of VerbConjugation
  const [verbs, setVerbs] = React.useState<VerbConjugation[]>([]);
  // The verbList should be an array of the conjugated forms (the answers).
  const verbList = React.useMemo(() => verbs.map(verb => verb.translation), [verbs]);

  const state = {
    currentTense,
    setCurrentTense,
    // toggleVisibility, // These were commented out in your original app/page.tsx
    // hint,
    // setHint,
    // handleHint,
    verbs,
    setVerbs,
    verbList,
    showAnswer,
    setShowAnswer,
  };

  return (
    
      <MyContext.Provider value={state}>
        <Body />
      </MyContext.Provider>
    
  );
}
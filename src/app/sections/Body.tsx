"use client";

import { useMyContext } from "../context";
import React from "react";
import { Header } from "./Header";
import { Box, useMantineTheme } from '@mantine/core'

import { FlashcardArray } from "react-quizlet-flashcard";
import { VerbConjugation } from "../types/verbs";
import { Nav } from "../components/Nav";

const tenseMap = {
  Present: 'Hoy, ',
  Preterite: 'Preterite, ',
  Imperfect: 'En el pasado, ',
}

type Flashcard = {
  id: number;
  frontHTML: string;
  backHTML: string;
};

function createTemplate(var1: string, var2: string, var3: string): string {
  return `${var1} ${var2} <span style="text-decoration: underline;">${var3}</span>`;
}

// Updated to work with a simple, flat array of VerbConjugation objects.
function getArray(verbConjugations: VerbConjugation[]) {
  return verbConjugations.map((verb, index) => {
    const { performer, infinitive, tense, translation } = verb;
    const day = tenseMap[tense as keyof typeof tenseMap];
    
    const stem = createTemplate(day, performer, infinitive)
    return {
      id: index,
      frontHTML: `<div>${stem}</div>`,
      backHTML: `<div>${translation}</div>`
    };
  });
}

const Body = () => {
  const { verbs, setVerbs, verbList } = useMyContext();
  const theme = useMantineTheme();
  const [screen, setScreen] = React.useState<string>("header");

  // This is derived state. It's more efficient and cleaner to compute it with
  // useMemo whenever the `verbs` dependency changes, rather than using a
  // separate useEffect and useState hook.
  const flashcards: Flashcard[] = React.useMemo(() => {
    if (verbs.length === 0) return [];
    return getArray(verbs);
  }, [verbs]);
  
  const style = {
    backgroundColor: "lightgoldenrodyellow",
    color: "black",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <>
      <Nav />
      <div
        style={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          fontSize: '21px'
        }}
      >
        {screen === "header" && <Header {...{ setVerbs, setScreen, screen }} />}
        <Box style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
        {flashcards.length > 0 && <FlashcardArray frontContentStyle={style} backContentStyle={style} cards={flashcards}/>}
        </Box>

        {/* {screen !== "answer" && screen !== "header" && (
          <Hint {...{ questionObj, screen }} />
        )} */}
        
      </div>
    </>
  );
};

export default Body;

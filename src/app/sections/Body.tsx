"use client";

import { useMyContext } from "../context";
import React from "react";
import { Header } from "./Header";
import { Box } from '@mantine/core'

import { useMantineTheme } from "@mantine/core";

import { FlashcardArray } from "react-quizlet-flashcard";
import { VerbConjugation } from "../types/verbs";
import { Nav } from "../components/Nav";



const tenseMap = {
  Present: 'Hoy, ',
  Preterite: 'Preterite, ',
  Imperfect: 'En el pasado, ',
}

function createTemplate(var1: string, var2: string, var3: string): string {
  return `${var1} ${var2} <span style="text-decoration: underline;">${var3}</span>`;
}

function getArray(verbConjugations: VerbConjugation[]) {
  return verbConjugations.map((verbObj) => {
    const key = Object.keys(verbObj)[0]; // Get the dynamic key (e.g., 'abandona')
    const details = verbObj[key]; // Get the inner object
    const { performer, infinitive, tense } = details;
    const day = tenseMap[tense];
    
    const stem = createTemplate(day, performer, infinitive)
    return {
      id: key, 
      frontHTML: `<div>${stem}</div>`,
      backHTML: `<div>${key}</div>`
    };
  });
}

const Body = () => {
  const { verbs, setVerbs, verbList } = useMyContext();
  const [ arr, setArray ] = React.useState(null)
  const theme = useMantineTheme();

  React.useEffect(() => {
    if (verbs.length > 0) {
      const x = getArray(verbs);
      setArray(x)
    }
  }, [verbs])
 
  const [screen, setScreen] = React.useState<string>("header");
  
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
        {arr !== null && <FlashcardArray        frontContentStyle={style} backContentStyle={style} cards={arr}/>}
        </Box>

        {/* {screen !== "answer" && screen !== "header" && (
          <Hint {...{ questionObj, screen }} />
        )} */}
        
      </div>
    </>
  );
};

export default Body;

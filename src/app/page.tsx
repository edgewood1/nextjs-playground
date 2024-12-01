"use client";

import React, { useState } from "react";
import { createContext, useContext } from "react";
import { createTheme, MantineProvider, useMantineTheme } from '@mantine/core';
import Body from './sections/Body';
import { MyContext } from './context';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

// export const MyContext = createContext({}); // initialValue is optional

interface VerbInfo {
  performer?: string;
  mood?: string;
  infinitive?: string;
  performer_en?: string;
  tense?: string;
  has_long?: boolean;
  translation?: string;
}

interface VerbsData {
  [conjugation: string]: VerbInfo[];
}

export default function Home() {
  
  
  
  const [isQuestion, setIsQuestion] = useState(false);
  const [hint, setHint] = useState(0);
  const [currentTense, setCurrentTense] = useState('')
  const [showAnswer, setShowAnswer] = useState(false);
  const [verbs, setVerbs] = React.useState<VerbsData>({});
  const verbList = Object.keys(verbs) ?? [];
  const toggleVisibility = () => {
    setIsQuestion(!isQuestion);
    // setHint(0);
  };
  

  const handleCounter = () => {
    // setCounter(counter + 1);
    setIsQuestion(!isQuestion);
  };

  const handleHint = () => {
    
    let hintStatus = hint + 1;
    if (hintStatus === 3) hintStatus = 0;
    setHint(hintStatus);
  };

  const state = {

    handleCounter,
    isQuestion,
    setIsQuestion,
    currentTense, setCurrentTense,
    toggleVisibility,
    hint,
    setHint,
    handleHint,
    verbs,
    setVerbs,
    verbList,
    showAnswer,
    setShowAnswer,
    
    
  };
  
  return (
    <MantineProvider theme={theme}>      
      <MyContext.Provider value={state}>
        <Body />  
      </MyContext.Provider>
    </MantineProvider>
  );
}


'use client';
import Image from "next/image";
import React, { useState } from "react";
import Checkboxes from './components/Checkboxes';
import Buttons from './components/Buttons';

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
  const [verbs, setVerbs] = useState<VerbsData>({});
  const [verbList, setVerbList] = useState<string[]>([]);
  const [selectedTenses, setSelectedTenses] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const fetchVerbs = async (e: string[]) => { // Type for 'e' corrected
    console.log('e', e);
    try {
      const tensesString = selectedTenses.join(',');
      console.log(selectedTenses);
      const response = await fetch(`/api/filter-verbs?tenses=${e}`);
      const data: VerbsData = await response.json(); // Type assertion for 'data'
      setVerbs(data);
      setVerbList(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  const tenses = ['Present', 'Preterite', 'Imperfect'];

  const checkboxHandler = (e: string[]) => { // Type for 'e' added
    console.log(e)
    fetchVerbs(e);
  };

  const showQuestion = () => {
    const verbObj = verbs[verbList[counter]] as VerbInfo;
    console.log('verbi', verbs);
    let question;
    const stem = `${verbObj?.performer} ___ ${verbObj?.infinitive} ___`;
    switch (verbObj?.tense) {
      case 'Present':
        question = `Hoy, ${stem}`;
        break;
      case 'Preterite':
        question = `Ayer,${stem}`;
        break;
      case 'Imperfect':
        question = `En el pasado, ${stem}`;
        break;
      default:
        question = '';
    }
    return question;
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCounter = () => {
    setCounter(counter + 1);
    setIsVisible(!isVisible);
  };

  return (
    <>
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '10px', 
      position: 'fixed', 
      top: 0, 
      left: '50%', 
      transform: 'translateX(-50%)', 
      backgroundColor: 'white', 
      zIndex: 10, 
      padding: '10px', 
      width: '100%' 
    }}>
      <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: '2em' }}>Conjugation Practice</h1> 
      <Checkboxes items={tenses} onSubmit={checkboxHandler} />
    </div>
    
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      height: '100vh',
      paddingTop: '100px' // Add padding to avoid overlap with header
    }}>
      <div>{showQuestion()}</div>
      <div>
      {!isVisible && verbList.length > 0 && <Buttons onClick={toggleVisibility}>see answer</Buttons>}
      {isVisible &&  <div > Answer: {verbList[counter]}</div>}
    </div>
     
      {isVisible && <Buttons onClick={handleCounter}>next</Buttons>}
    </main>
    </>
  );
}


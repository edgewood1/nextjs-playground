import next from "next";
import React from "react";
import {VerbInfo, VerbsData, QO} from '../types/verbs';


export const showQuestion = (verbs: VerbsData, verbList: string[], counter: number) => {
  const verbObj = verbs[verbList[counter]] as VerbInfo

  let question;
  const stem = `${verbObj?.performer} ___ ${verbObj?.infinitive} ___`;
  switch (verbObj?.tense) {
    case "Present":
      question = `Hoy, ${stem}`;
      break;
    case "Preterite":
      question = `Ayer,${stem}`;
      break;
    case "Imperfect":
      question = `En el pasado, ${stem}`;
      break;
    default:
      question = ``;
  }
  return question;
};

const useQuestion = (verbs: VerbsData) => {
    console.log('----', verbs);
  const [counter, setCounter] = React.useState(0);
  const verbList = Object.keys(verbs);

  const nextQuestion = () => {
    setCounter((prevCounter) => (prevCounter + 1) % verbList.length);
  };

  if (verbList.length === 0) return;

  const question = showQuestion(verbs, verbList, counter); // Calculate here
  const answer = verbList[counter];
  const tense = (verbs[answer] as VerbInfo).tense;
  const inf = (verbs[answer] as VerbInfo).infinitive;
  
  let infinitive = inf ? inf : '';
  infinitive =
    infinitive === "se" && inf ? inf : infinitive;
  const mood = (verbs[answer] as VerbInfo).mood || '';
  console.log(verbs[answer]);
  return { question, answer, tense, nextQuestion, infinitive, mood };
};

export default useQuestion;

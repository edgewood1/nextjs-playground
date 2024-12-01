import next from "next";
import React from "react";

export const showQuestion = (verbs, verbList, counter) => {
  const verbObj = verbs[verbList[counter]] as VerbInfo;

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
      question = "";
  }
  return question;
};

const useQuestion = (verbs) => {
  const [counter, setCounter] = React.useState(0);
  const verbList = Object.keys(verbs);

  const nextQuestion = () => {
    setCounter((prevCounter) => (prevCounter + 1) % verbList.length);
  };

  if (verbList.length === 0) return;

  const question = showQuestion(verbs, verbList, counter); // Calculate here
  const answer = verbList[counter];
  const tense = verbs[answer].tense;
  let infinitive = verbs[answer].infinitive.slice(-2);
  infinitive =
    infinitive === "se" ? verbs[answer].infinitive.slice(-4, -2) : infinitive;
  const mood = verbs[answer].mood;
  console.log(verbs[answer]);
  return { question, answer, tense, nextQuestion, infinitive, mood };
};

export default useQuestion;

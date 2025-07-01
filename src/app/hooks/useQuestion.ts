import React from "react";
import { VerbConjugation, QO } from '../types/verbs';

// This map helps create context for the question.
const tenseMap = {
  Present: 'Hoy, ',
  Preterite: 'Ayer, ',
  Imperfect: 'En el pasado, ',
};

/**
 * A custom hook to manage the current question logic from a list of verbs.
 * @param verbs An array of verb conjugation objects.
 * @returns A question object (QO) or undefined if no verbs are provided.
 */
const useQuestion = (verbs: VerbConjugation[]): QO | undefined => {
  const [counter, setCounter] = React.useState(0);

  const nextQuestion = () => {
    // Cycle through the verbs array.
    setCounter((prevCounter) => (prevCounter + 1) % verbs.length);
  };

  // If there are no verbs, there's no question to return.
  if (verbs.length === 0) {
    return undefined;
  }

  // Get the current verb object from the array.
  const currentVerb = verbs[counter];
  const { performer, infinitive, tense, translation, mood } = currentVerb;

  // Create the question string.
  const tensePrefix = tenseMap[tense] || '';
  const stem = `${performer} ___ ${infinitive}`;
  const question = `${tensePrefix}${stem}`;

  // Return the question object in the shape that components expect.
  return {
    question,
    answer: translation,
    tense,
    infinitive,
    mood,
    nextQuestion,
  };
};

export default useQuestion;

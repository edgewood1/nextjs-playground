export type Pronoun = "yo" | "tú" | "él/ella/usted" | "nosotros/as" | "vosotros/as" | "ellos/as/ustedes";
export type VerbEnding = "ar" | "er" | "ir";
type Tense = "Present" | "Preterite" | "Imperfect";

export type Conjugations = {  // Changed to 'Conjugations'
  [tense in Tense]: {
    [verbEnding in VerbEnding]: {
      [pronoun in Pronoun]: string;
    };
  };
};

export interface VerbConjugation {
  infinitive: string;
  has_long: boolean;
  mood: string;
  performer: string;
  performer_en: string;
  tense: Tense;
  translation: string;
}

export type Context = {
    // isQuestion: boolean;
    // setIsQuestion: React.Dispatch<React.SetStateAction<boolean>>;
    // hint: number;
    // setHint: React.Dispatch<React.SetStateAction<number>>; // Correct type
    verbs: VerbConjugation[];
    setVerbs: React.Dispatch<React.SetStateAction<VerbConjugation[]>>;
    verbList: string[];
    // handleCounter: () => void;
    // handleHint: () => void;
    currentTense: string ;
    setCurrentTense: React.Dispatch<React.SetStateAction<string>>; // Correct type
    showAnswer: boolean;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Correct type
}

// return { question, answer, tense, nextQuestion, infinitive, mood };
export type QO = {
    answer: string;
    question: string;
    tense: Tense | undefined;  // Allow tense to be undefined
    infinitive: string;
    mood: string;
    verbEnding?: VerbEnding;
    nextQuestion: () => void;
  }
  
  
  export interface VerbsData {
    [conjugation: string]: VerbConjugation[];
  }
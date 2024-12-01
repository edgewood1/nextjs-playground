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


export type Context = {
    isQuestion: boolean;
    setIsQuestion: React.Dispatch<React.SetStateAction<boolean>>;
    hint: number;
    setHint: React.Dispatch<React.SetStateAction<number>>; // Correct type
    verbs: any;
    setVerbs: React.Dispatch<React.SetStateAction<VerbsData>>; // Correct type
    verbList: string[];
    handleCounter: () => void;
    handleHint: () => void;
    toggleVisibility: () => void;
    currentTense: string ;
    setCurrentTense: React.Dispatch<React.SetStateAction<string>>; // Correct type
    showAnswer: any;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Correct type
}

export type QO = {
    answer: string;
    question: string;
    tense: Tense | undefined;  // Allow tense to be undefined
    verbEnding?: VerbEnding;
    nextQuestion: () => void;
  }
  

export interface VerbInfo {
    performer?: string;
    mood?: string;
    infinitive?: string;
    performer_en?: string;
    tense?: Tense | undefined;
    has_long?: boolean;
    translation?: string;
  }

  
  export interface VerbsData {
    [conjugation: string]: VerbInfo[];
  }
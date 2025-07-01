import GradientButton from "../components/GradientButton";
import { Stack, Box, Text } from "@mantine/core";
import { FlashcardArray } from "react-quizlet-flashcard";

type Props = {
  questionObj: {
    question: React.ReactNode;
    answer: React.ReactNode;
    nextQuestion: () => void;
    mood: string;
  };
};

export const Question = (props: Props) => {
  const { questionObj } = props;
  const { answer, question, nextQuestion, mood } = questionObj || {};

  // The FlashcardArray component requires an array of cards.
  // We create an array with a single card from the current question object.
  const cards = question
    ? [
        {
          front: <Text size="xl">{question}</Text>,
          back: <Text size="xl">{answer}</Text>,
        },
      ]
    : [];

  return (
    <Stack align="center" gap="xl" p="md" style={{ width: "100%", zIndex: 10 }}>
      <Text c="dimmed">Mood: {mood}</Text>
      
      {/* The FlashcardArray component handles flipping between front and back */}
      <FlashcardArray cards={cards} />
      
      <GradientButton 
        onClick={nextQuestion}>
          Next Question
      </GradientButton>
    </Stack>
  );
};

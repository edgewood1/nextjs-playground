import { Stack, Box, Text, Button } from "@mantine/core";
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
    // Use Tailwind for page-level layout and constraints.
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Use Mantine's Stack for managing the layout of Mantine components. */}
      <Stack align="center" gap="xl">
        <Text c="dimmed">Mood: {mood}</Text>

        {/* The FlashcardArray component handles flipping between front and back */}
        <FlashcardArray cards={cards} />

        <Button onClick={nextQuestion} size="lg" radius="md">
          Next Question
        </Button>
      </Stack>
    </div>
  );
};

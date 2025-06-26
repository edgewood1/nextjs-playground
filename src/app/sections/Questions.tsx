import GradientButton from "../components/GradientButton";
import { Button, Stack, Box } from "@mantine/core";
import { MyContext } from "../context";
import { FlashcardArray } from "react-quizlet-flashcard";
type Props = {
  // isQuestion: boolean;
  verbList: string[];
  // setIsQuestion: any;
  // handleHint: any;
  // setHint: any;
  screen: any;
  setScreen: any;
  questionObj: any;
};

export const Question = (props: Props) => {
  const {
    // isQuestion,
    verbList,
    // setIsQuestion,
    screen,
    questionObj = {},
    setScreen,
  } = props;
  const { answer, question, nextQuestion, mood } = questionObj;

  const handleSeeAnswer = () => {
    // setIsQuestion(!isQuestion)
    setScreen("answer");
    console.log("setting question");
  };

  const handleNextQuestion = () => {
    setScreen("question");
    // ... perform some logic, e.g., check the answer ...
    nextQuestion(); // Call nextQuestion to move to the next question

    // toggleVisibility();
  };
  // console.log("qo", questionObj);
  // console.log('verb list', verbList);
  console.log("see anwswer", screen);

  return (
    <Stack
      align="center"
      gap="10px"
      p="10px" // padding
      style={{ width: "100%", zIndex: 10, color: "black" }} // color can be set via theme or Text component
    >
      {
        <>
          <Box>Mood: {mood} </Box> {/* Or Mantine's Text component */}
          <FlashcardArray>
          {/* <div>{question}</div> */} {/* This was likely a placeholder for Flashcard content */}
          {/* <GradientButton onClick={handleSeeAnswer}>see answer</GradientButton> */}
        </>
      }
      {/* {screen === "answer" && (
        <>
          <div> Answer: {answer}</div>
          <div style={{ display: "flex" }}>
            <GradientButton onClick={handleNextQuestion}>next</GradientButton>
          </div>
        </>
      )} */}
    </Stack>
  );
};

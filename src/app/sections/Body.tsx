import { useMyContext } from "../context"

import { Header } from "./Header";
import { Question } from "./Questions";
import { MyContext } from "../context";
import { HintTable } from "../components/Table";
import { useMantineTheme } from "@mantine/core";
import useQuestion from "../hooks/useQuestion";



const Body = () => {
  const {
    // counter,
    // setCounter,
    isQuestion,
    setIsQuestion,
    hint,
    setHint,
    verbs,
    setVerbs,
    verbList,
    handleCounter,
    handleHint,
    toggleVisibility,
    currentTense,
    setCurrentTense,
    showAnswer,
    setShowAnswer,
  } = useMyContext();
  const theme = useMantineTheme();
  const questionObj = useQuestion(verbs);
  console.log("theme", theme);
  return (
    <div style={{ background: 'white', display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1,
          height: "75vh",
        }}
      >
        {/* <button style={{ color: theme.primaryColor }}>Hell    go</button> */}
        <Header {...{ setVerbs }} />
        <Question
          {...{
            isQuestion,
            questionObj,
            verbList,
            toggleVisibility,
            handleHint,
            verbs,
            showAnswer,
            setShowAnswer,
            handleCounter,
            setCurrentTense,
            setHint,
          }}
        />
        {/* // answer */}
      </div>
      {/* hints */}
      <div
        style={{
          flex: "1 0 auto",
          overflowY: "auto",
          marginTop: "55vh auto",
        }}
      >
        {hint === 1 && questionObj && <HintTable questionObj={questionObj} />}
        {hint === 2 && <p>Hint 2</p>}
      </div>
    </div>
  );
};

export default Body;

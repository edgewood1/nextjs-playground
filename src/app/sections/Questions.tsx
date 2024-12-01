import Buttons from "../components/Buttons";

export const Question = (props) => {
  const {
    isQuestion,
    // question,
    counter,
    verbList,
    toggleVisibility,
    handleHint,
    setHint,
    // handleCounter,
    questionObj = {},
  } = props;
  const { answer, question, nextQuestion, mood } = questionObj;
  const handleCounter = () => {
    // ... perform some logic, e.g., check the answer ...
    nextQuestion(); // Call nextQuestion to move to the next question

    toggleVisibility();
    setHint(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        color: "black",
        padding: "10px",
        width: "100%",
        zIndex: "10",
      }}
    >
      <div>Mood: {mood} </div>
      <div>{question}</div>
      {!isQuestion && verbList.length > 0 && (
        <>
          <Buttons onClick={toggleVisibility}>see answer</Buttons>
          <Buttons onClick={handleHint}>hint</Buttons>
        </>
      )}
      {isQuestion && <div> Answer: {answer}</div>}

      {isQuestion && (
        <div style={{ display: "flex" }}>
          <Buttons onClick={handleCounter}>next</Buttons>
        </div>
      )}
    </div>
  );
};

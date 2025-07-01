"use client";

import { useMyContext } from "../context";
import React from "react";
import { Box } from '@mantine/core'
import { Nav } from "../components/Nav";
import { Header } from "./Header";
import { Question } from "./Questions";
import useQuestion from "../hooks/useQuestion";

const Body = () => {
  const { verbs, setVerbs } = useMyContext();
  const [screen, setScreen] = React.useState<string>("header");
  const questionObj = useQuestion(verbs);
  
  return (
    <>
      <Nav />
      <div
        style={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          fontSize: '21px'
        }}
      >
        {screen === "header" && <Header {...{ setVerbs, setScreen, screen }} />}
        {screen === "question" && questionObj && (
          <Box style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <Question questionObj={questionObj} />
          </Box>
        )}
      </div>
    </>
  );
};

export default Body;

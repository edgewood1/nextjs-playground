"use client";

import { useMyContext } from "../context";
import React from "react";
import { Box, Stack } from '@mantine/core'
import { Nav } from "../components/Nav";
import { Header } from "./Header";
import { Question } from "./Questions";
import { Hint } from "./Hint";
import useQuestion from "../hooks/useQuestion";

const Body = () => {
  const { verbs, setVerbs } = useMyContext();
  const [screen, setScreen] = React.useState<string>("header");
  const questionObj = useQuestion(verbs);
  
  return (
    <>
      <Nav />
      {/* Use TailwindCSS for layout and styling where possible */}
      <div className="bg-white flex flex-col h-screen text-xl">
        {screen === "header" && <Header {...{ setVerbs, setScreen, screen }} />}
        {screen === "question" && questionObj &&
          <Stack align="center" mt="xl">
            <Question questionObj={questionObj}/>
            <Hint questionObj={questionObj} screen={screen}/>
          </Stack>
        }
      </div>
    </>
  );
};

export default Body;

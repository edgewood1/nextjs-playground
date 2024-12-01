import { NextResponse } from "next/server";
import verbsData from "../../../../data/verbs.json"; // Import your JSON file

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // get parameters (everything followed by ?)
  const tenses = searchParams.get("tenses")?.split(",") || []; // Get tenses from query parameters
  const mood = searchParams.get("mood")?.split(",") || []; // Get tenses from query parameters
  console.log("mood", mood);
  // filter verbs putting answer first?
  // need to add mood
  // get object whose mood is Indicative and tense includes ...
  let filteredVerbs;

  try {
    filteredVerbs = Object.entries(verbsData).reduce(
      (acc, [conjugation, verbInfoArray]) => {
        const matchingVerbInfo = verbInfoArray.find(
          (verbInfo) =>
            tenses.includes(verbInfo.tense) && mood.includes(verbInfo.mood),
        );
        if (matchingVerbInfo) {
          acc[conjugation] = matchingVerbInfo;
        }
        return acc;
      },
      {},
    );
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(filteredVerbs);
}

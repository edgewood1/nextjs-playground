import { NextResponse } from 'next/server';
import verbsData from '../../../../data/verbs.json'; // Import your JSON file

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // get parameters (everything followed by ?)
  const tenses = searchParams.get('tenses')?.split(',') || []; // Get tenses from query parameters
  
  // filter verbs putting answer first?
  const filteredVerbs = Object.entries(verbsData).reduce((acc, [conjugation, verbInfoArray]) => {
    const matchingVerbInfo = verbInfoArray.find(verbInfo => tenses.includes(verbInfo.tense));
    if (matchingVerbInfo) {
      acc[conjugation] = matchingVerbInfo;
    }
    return acc;
  }, {});

  
  return NextResponse.json(filteredVerbs);
}
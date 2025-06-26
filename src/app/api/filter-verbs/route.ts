import { NextResponse } from 'next/server';
import verbsData from '../../../../data/verbs.json';
import { VerbsData, VerbInfo } from '../../types/verbs'; // Assuming you have these types

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    // Get parameters and ensure they are arrays of strings
    const tenses = searchParams.get('tenses')?.split(',') || [];
    const moods = searchParams.get('mood')?.split(',') || []; // Renamed from 'mood' to 'moods' for clarity

    // Validate parameters (optional but recommended)
    if (tenses.length === 0 || moods.length === 0) {
       return NextResponse.json({ error: 'Missing required parameters: tenses and mood' }, { status: 400 });
    }

    // Filter verbs: Keep entries where tense is in tenses AND mood is in moods
    const filteredVerbs: VerbsData = {};

    for (const conjugation in verbsData) {
      if (verbsData.hasOwnProperty(conjugation)) {
        const verbInfoArray: VerbInfo[] = verbsData[conjugation];
        const matchingEntries = verbInfoArray.filter(verbInfo =>
          verbInfo.tense && tenses.includes(verbInfo.tense) &&
          verbInfo.mood && moods.includes(verbInfo.mood)
        );
        if (matchingEntries.length > 0) {
          filteredVerbs[conjugation] = matchingEntries;
        }
      }
    }

    return NextResponse.json(filteredVerbs);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
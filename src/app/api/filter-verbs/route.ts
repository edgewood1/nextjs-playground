import { NextResponse } from 'next/server';
import verbsJson from '@/data/verbs.json';
import { VerbsData, VerbConjugation } from '@/app/types/verbs';

// By explicitly casting the imported JSON to the VerbsData type,
// we inform TypeScript that it has an index signature, which resolves the error.
const verbsData: VerbsData = verbsJson;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenses, moods } = body;

    if (!Array.isArray(tenses) || !Array.isArray(moods)) {
      return new NextResponse('Missing or invalid tenses or moods', { status: 400 });
    }

    const filteredVerbs: { [key: string]: VerbConjugation[] } = {};

    for (const conjugation in verbsData) {
      if (Object.prototype.hasOwnProperty.call(verbsData, conjugation)) {
        const verbInfoArray: VerbConjugation[] = verbsData[conjugation];
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
    console.error('FILTER_VERBS_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
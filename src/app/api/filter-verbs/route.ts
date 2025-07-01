import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { VerbsData, VerbConjugation } from '@/app/types/verbs';

export async function POST(request: Request) {
  try {
    // Construct the path to the JSON file relative to the project root.
    // This is a more robust way to access files on the server-side than a direct import.
    const jsonPath = path.join(process.cwd(), 'src/data/verbs.json');
    // Read the file content
    const fileContent = await fs.readFile(jsonPath, 'utf8');
    // Parse the JSON data
    const verbsData: VerbsData = JSON.parse(fileContent);

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
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return new NextResponse('Verbs data file not found.', { status: 500 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
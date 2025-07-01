import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { VerbsData, VerbConjugation } from '@/app/types/verbs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tensesParam = searchParams.get('tenses');
    const moodsParam = searchParams.get('mood') || 'Indicative'; // Default mood

    if (!tensesParam) {
      return new NextResponse('Missing tenses parameter', { status: 400 });
    }

    const tenses = tensesParam.split(',');
    const moods = moodsParam.split(',');

    // Construct the path to the JSON file relative to the project root.
    // This is a more robust way to access files on the server-side than a direct import.
    const jsonPath = path.join(process.cwd(), 'src/data/verbs.json');
    // Read the file content
    const fileContent = await fs.readFile(jsonPath, 'utf8');
    // Parse the JSON data
    const verbsData: VerbsData = JSON.parse(fileContent);

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
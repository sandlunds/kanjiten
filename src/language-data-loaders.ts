export interface Radical {
    strokeCount: number;
    radical: string;
    radicalNumber: number;
    radicalVariants: string;
    variant: boolean;
    readingJ: string;
}

export interface Kanji {
    literal: string;
    jouyou: boolean;
    strokeCount: number;
}

export interface RadicalLibrary {
    /** All radicals indexed by the number of strokes their made up of. */
    byStrokes: Radical[][];
    /** All radicals indexed by their Kangxi number (1-214) */
    byNumber: Radical[];
    /** Recognized variants of radicals indexed by their Kangxi number (1-214)  */
    variantsByNumber: Radical[][];
}

export interface KanjiLibrary {
    /** All kanji indexed by the Kangxi number (1-214) of its radical. */
    byRadical: Kanji[];
}

let radicalLibrary: RadicalLibrary | null = null;

async function fetchRadicalLibrary() {
    // Since we are dealing with completely static data, we do not need any sophisticated
    // caching strategy. We can just cache the data in memory.
    if (radicalLibrary) return radicalLibrary;

    const res = await fetch("/japanese-radicals.json");
    const rawData = await res.json() as Radical[];

    radicalLibrary = buildRadicalLibrary(rawData);

    return radicalLibrary;
}

let kanjiLibrary: KanjiLibrary | null = null;

async function fetchKanjiLibrary() {
    // Since we are dealing with completely static data, we do not need any sophisticated
    // caching strategy. We can just cache the data in memory.
    if (kanjiLibrary) return kanjiLibrary;

    const res = await fetch("/kanji-index.json");

    kanjiLibrary = {
        // The kanji data is 0-indexed by radical number, so we need to add an empty array to the beginning
        // to make it consistent with the radical data which is 1-indexed.
        byRadical: [[], ...await res.json()]
    }

    return kanjiLibrary;
}

/** React Router loader for the radical index page. */
export async function radicalIndexLoader() {
    return fetchRadicalLibrary();
}

/** React Router loader for the kanji index page. */
export async function kanjiIndexLoader({ params }) {
    const radicalNumber = params.radical;

    const radicalLibrary = await fetchRadicalLibrary();
    const kanjiLibrary = await fetchKanjiLibrary();

    return {
        radical: radicalLibrary.byNumber[radicalNumber],
        radicalVariants: radicalLibrary.variantsByNumber[radicalNumber],
        kanji: kanjiLibrary.byRadical[radicalNumber]
    }
}


// Utility functions

function buildRadicalLibrary(radicals: Radical[]) {
    const byStrokes = new Array<Radical[]>(18);
    const byNumber = new Array<Radical>(215);
    const variantsByNumber = new Array<Radical[]>(215);

    for (let i = 0; i < 18; i++) {
        byStrokes[i] = [];
    }

    for (let i = 0; i < 215; i++) {
        variantsByNumber[i] = [];
    }

    for (const radical of radicals) {
        byStrokes[radical.strokeCount].push(radical);

        if (radical.variant) {
            variantsByNumber[radical.radicalNumber].push(radical);
        } else {
            byNumber[radical.radicalNumber] = radical;
        }
    }

    return { byStrokes, byNumber, variantsByNumber };
}


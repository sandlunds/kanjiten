import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { processRadicals } from './radicals';

export async function radicalLoader({ params }) {
    const radicalNumber = params.radical;

    const res = await fetch("/japanese-radicals.json");
    const data = await res.json();

    const { standard, variants } = processRadicals(data);

    const kanjiRes = await fetch("/kanji-index.json");
    const kanjiData = await kanjiRes.json();

    return {
        radical: standard[radicalNumber],
        variants: variants[radicalNumber],
        kanji: kanjiData[radicalNumber - 1]
    }
}

/**
 * This component represents the page for a single radical.
 * 
 * It display a list of all kanji sorted under that radical.
 */
export function RadicalPage() {
    const { radical, variants, kanji } = useLoaderData();

    console.log(radical);
    console.log(variants);
    console.log(kanji);

    return (
        <>
            <h1 className='flex m-4 mb-8 justify-center font-kouzan text-8xl'>{radical.radical}</h1>

            <div>The radical <span className='font-hanserif'>{radical.radical}</span> has the Japanese name <span className='font-hanserif'>{radical.readingJ}.</span></div>
        </>
    )
}
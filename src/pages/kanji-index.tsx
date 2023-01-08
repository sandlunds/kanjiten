import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { kanjiIndexLoader } from '../language-data-loaders';

/**
 * This component represents the index page for the Kanji sorted under a single radical.
 */
export function KanjiIndex() {
    const { radical, radicalVariants, kanji } = useLoaderData() as Awaited<ReturnType<typeof kanjiIndexLoader>>;

    console.log(radical);
    console.log(radicalVariants);
    console.log(kanji);

    return (
        <>
            <h1 className='flex m-4 mb-8 justify-center font-kouzan text-8xl'>{radical.radical}</h1>

            <div>The radical <span className='font-hanserif'>{radical.radical}</span> has the Japanese name <span className='font-hanserif'>{radical.readingJ}.</span></div>
        </>
    )
}
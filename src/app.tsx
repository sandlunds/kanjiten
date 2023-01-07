import React, { ReactElement } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { processRadicals, Radical } from './radicals';
import './app.css';

interface RadicalProps {
  radical: Radical;
}

function Radical({ radical }: RadicalProps) {
  return (
    <div className='radical-grid'>
      <div className='vertical opacity-60 font-hanserif'>{radical.readingJ}</div>
      <div className="text-6xl">
        <Link to={'radical/' + radical.radicalNumber}>{radical.radical}</Link>
      </div>
      <div></div>
      <div className='opacity-60 text-sm font-hanserif'>{radical.radicalVariants}</div>
    </div>
  );
}

function RadicalGroup({ strokes, radicals }: { strokes: number, radicals: Radical[] }) {
  return (
    <div>
      <div className='dark:bg-neutral-900 bg-gray-200 mb-4 p-2 font-hanserif'>
        画 {strokes}
      </div>
      <div className='radical-group-grid gap-4 p-2 font-radicals'>
        {radicals.map(radical => <Radical radical={radical} />)}
      </div>
    </div>
  );
}

interface RadicalIndexProps {
  radicals: Radical[][];
}

function RadicalIndex({ radicals }: RadicalIndexProps) {

  let radicalGroups: ReactElement[] = [];

  for (let i = 1; i < radicals.length; i++) {
    radicalGroups.push(<RadicalGroup strokes={i} radicals={radicals[i]} />);
  }

  return (
    <div className='flex flex-col gap-4'>
      {radicalGroups}
    </div>
  );
}

export function App() {
  const radicals = useLoaderData() as Radical[];

  const { byStrokes, standard, variants } = processRadicals(radicals);

  return (
    <div className="">
      <h1 className='flex m-4 mb-8 justify-center font-kouzan text-8xl'>辞典</h1>
      <h2 className='flex m-4 mb-8 font-kouzan text-6xl'>部首</h2>
      <RadicalIndex radicals={byStrokes} />
    </div>
  );
}


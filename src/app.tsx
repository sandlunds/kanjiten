import React, { ReactElement } from 'react';
import { useLoaderData } from 'react-router-dom';

import { processRadicals, Radical } from './radicals';
import './app.css';

interface RadicalProps {
  radical: Radical;
}

function Radical({ radical }: RadicalProps) {
  return (
    <div className='radical-grid'>
      <div className='vertical text-gray-700 font-hanserif'>{radical.readingJ}</div>
      <div className="text-6xl">{radical.radical}</div>
      <div></div>
      <div className='text-gray-700 text-sm font-hanserif'>{radical.radicalVariants}</div>
    </div>
  );
}

function RadicalGroup({ strokes, radicals }: { strokes: number, radicals: Radical[] }) {
  return (
    <div>
      <div className='bg-gray-200 mb-4 p-2 font-hanserif'>
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
      <h1 className='flex m-4 justify-center font-kouzan text-8xl'>辞典</h1>
      <RadicalIndex radicals={byStrokes} />
    </div>
  );
}


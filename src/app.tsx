import React from 'react';
import { useLoaderData } from 'react-router-dom';

interface Radical {
  strokeCount: number;
  radical: string;
  radicalNumber: number;
}

export async function radicalLoader() {
  return fetch("/japanese-radicals.json");
}

interface RadicalProps {
  radical: Radical;
}

function Radical({ radical }: RadicalProps) {
  return (
    <div>{radical.radical}</div>
  )
}

interface RadicalIndexProps {
  radicals: Radical[];
}

function RadicalIndex({ radicals }: RadicalIndexProps) {
  return (
    <div className='grid grid-cols-10'>
      {radicals.map(r => <Radical key={r.radicalNumber} radical={r} />)}
    </div>
  );
}

export function App() {
  const radicals = useLoaderData() as Radical[];

  const testRadicals = radicals.filter(r => r.strokeCount === 1 || r.strokeCount === 2);

  console.log(testRadicals[0]);

  return (
    <div className="flex flex-col items-center">

      <h1 className='font-kouzan text-8xl'>辞典</h1>

      <RadicalIndex radicals={testRadicals} />
    </div>
  );
}


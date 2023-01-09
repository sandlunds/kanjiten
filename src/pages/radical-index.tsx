import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Radical, radicalIndexLoader } from '../language-data-loaders';
import './radical-index.css';

interface RadicalProps {
  radical: Radical;
}

function Radical({ radical }: RadicalProps) {
  const radicalClass = classNames('text-6xl', { "opacity-40": radical.variant});
  return (
    <div className='radical-grid'>
      <div className='vertical opacity-60 font-hanserif'>{radical.readingJ}</div>
      <div className={radicalClass}>
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

/**
 * This component represents the index page for all radicals.
 * This is the main page of the app, and the first page the user sees.
 */
export function RadicalIndex() {
  const { byStrokes } = useLoaderData() as Awaited<ReturnType<typeof radicalIndexLoader>>;

  let radicalGroups: ReactElement[] = [];

  for (let i = 1; i < byStrokes.length; i++) {
    radicalGroups.push(<RadicalGroup strokes={i} radicals={byStrokes[i]} />);
  }

  return (
    <div className='flex flex-col gap-4'>
      {radicalGroups}
    </div>
  );
}

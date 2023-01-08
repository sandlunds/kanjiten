import React from "react";

import { RadicalIndex } from "./pages/radical-index";

export function App() {
    return (
        <div className="">
            <h1 className='flex m-4 mb-8 justify-center font-kouzan text-8xl'>辞典</h1>
            <h2 className='flex m-4 mb-8 font-kouzan text-6xl'>部首</h2>

            <RadicalIndex />
        </div>
    );
}


import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    console.log(error);

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Something went wrong</h1>
            <div className="font-kouzan text-8xl">過失</div>
            <div className="text-gray-600 italic">{error.statusText || error.message}</div>
        </div>
    );
}
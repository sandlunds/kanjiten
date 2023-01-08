import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./app";
import { kanjiIndexLoader, radicalIndexLoader } from "./language-data-loaders";
import { ErrorPage } from "./error-page";
import { KanjiIndex } from "./pages/kanji-index";

const router = createBrowserRouter([
    { path: "/", element: <App />, loader: radicalIndexLoader, errorElement: <ErrorPage /> },
    { path: "/radical/:radical", element: <KanjiIndex />, loader: kanjiIndexLoader, errorElement: < ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
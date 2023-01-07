import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./app";
import { radicalIndexLoader } from "./radicals";
import { ErrorPage } from "./error-page";
import { radicalLoader, RadicalPage } from "./radical-page";

const router = createBrowserRouter([
    { path: "/", element: <App />, loader: radicalIndexLoader, errorElement: <ErrorPage /> },
    { path: "/radical/:radical", element: <RadicalPage />, loader: radicalLoader, errorElement: < ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./app";
import { radicalLoader } from "./radicals";
import { ErrorPage } from "./error-page";

const router = createBrowserRouter([
    { path: "/", element: <App />, loader: radicalLoader, errorElement: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
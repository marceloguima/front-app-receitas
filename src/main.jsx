import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorPage from "./pages/Error-page/ErrorPage";
import Home from "./pages/Home/Home";
import AIGenerator from "./pages/pageIA/AIGenerator";
import DetalhesReceita from "./pages/detalhes-receita";

import "./index.css";

import {
    createBrowserRouter,
    RouterContextProvider,
    Router,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: "ia",
                element: <AIGenerator />,
            },

              {
                path: "detalhes",
                element: <DetalhesReceita />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

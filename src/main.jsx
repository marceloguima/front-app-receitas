import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorPage from "./pages/Error-page/PaginaErro";
import Home from "./pages/Home/Home";
import DetalhesReceita from "./pages/detalhes-receita";
import TelaAdmin from "./pages/Admin";
import TelaSobreNos from "./pages/SobreNos"
import TelaMeuCaderno from "./pages/Meu-caderno";

import "./index.css";

// 1.  CONTEXTO
import AuthProvider from "./context/Context";

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
                path: "/detalhes/:id",
                element: <DetalhesReceita />,
            },
            {
                path: "/sobre",
                element: <TelaSobreNos />,
            },
            {
                path: "/meu-caderno",
                element: <TelaMeuCaderno />,
            },
            {
                path: "admin",
                element: <TelaAdmin />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
);

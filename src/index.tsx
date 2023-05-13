import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import {RedirectContextProvider} from "./context/RedirectContext";
import {LoadingContextProvider} from "./context/LoadingContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <RedirectContextProvider>
            <LoadingContextProvider>
                <App/>
            </LoadingContextProvider>
        </RedirectContextProvider>
        <ToastContainer/>
        <Tooltip id={"my-tooltip"}/>
    </BrowserRouter>
)

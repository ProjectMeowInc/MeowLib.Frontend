import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import {AuthorizationContextProvider} from "./context/AuthorizationContext";
import {SettingsContextProvider} from "./context/SettingsContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <AuthorizationContextProvider>
            <SettingsContextProvider>
                <App/>
            </SettingsContextProvider>
        </AuthorizationContextProvider>
        <ToastContainer/>
        <Tooltip id={"my-tooltip"}/>
    </BrowserRouter>
)

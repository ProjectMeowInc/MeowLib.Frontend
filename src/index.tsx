import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import {TagContextProvider} from "./context/TagsContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
            <TagContextProvider>
                <App/>
            </TagContextProvider>
        <ToastContainer/>
        <Tooltip id={"my-tooltip"}/>
    </BrowserRouter>
)

import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";

const App = () => {
  return (
        <Routes>
            <Route path={"/login"} element={<AuthPage/>}/>
            <Route path={"/admin"} element={<AdminPage/>} />
        </Routes>
  );
};

export default App;
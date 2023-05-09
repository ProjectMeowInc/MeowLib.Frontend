import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from "./pages/Authors/AuthorPage";
import Layout from "./pages/Layout/Layout";

const App = () => {
  return (
        <Routes>
            <Route path={"/login"} element={<AuthPage/>}/>
            <Route path={"/admin"} element={<Layout/>}>
                <Route path={""} element={<AdminPage/>}/>
                <Route path={"authors"} element={<AuthorPage/>}/>
            </Route>
        </Routes>
  );
};

export default App;
import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from "./pages/Authors/AuthorPage";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import NotFoundPage from "./pages/Error/NotFoundPage/NotFoundPage";
import TagsPage from "./pages/Tags/TagsPage";

const App = () => {
  return (
        <Routes>
            <Route path={"/login"} element={<AuthPage/>}/>
            <Route path={"/admin"} element={<AdminLayout/>}>
                <Route path={""} element={<AdminPage/>}/>
                <Route path={"authors"} element={<AuthorPage/>}/>
                <Route path={"tags"} element={<TagsPage/>}/>
            </Route>
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
  );
};

export default App;
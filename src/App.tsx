import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from "./pages/Authors/MainPage/AuthorPage";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import NotFoundPage from "./pages/Error/NotFoundPage/NotFoundPage";
import TagsPage from "./pages/Tags/TagsPage";
import LoadingLayout from "./layouts/LoadingLayout/LoadingLayout";
import CreateAuthorPage from "./pages/Authors/CreateAuthorPage/CreateAuthorPage";
import UpdateAuthorPage from "./pages/Authors/UpdateAuthorPage/UpdateAuthorPage";

const App = () => {
  return (
        <Routes>
            <Route path={"/"} element={<LoadingLayout/>}>
                <Route path={"login"} element={<AuthPage/>}/>
                <Route path={"admin"} element={<AdminLayout/>}>
                    <Route path={""} element={<AdminPage/>}/>
                    <Route path={"authors"}>
                        <Route path={""} element={<AuthorPage/>}/>
                        <Route path={"new"} element={<CreateAuthorPage/>}/>
                        <Route path={":id/edit"} element={<UpdateAuthorPage/>}/>
                    </Route>
                    <Route path={"tags"} element={<TagsPage/>}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
  );
};

export default App;
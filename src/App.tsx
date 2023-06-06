import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from "./pages/Authors/MainPage/AuthorPage";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import NotFoundPage from "./pages/Error/NotFoundPage/NotFoundPage";
import TagsPage from "./pages/Tags/MainPage/TagsPage";
import LoadingLayout from "./layouts/LoadingLayout/LoadingLayout";
import CreateAuthorPage from "./pages/Authors/CreateAuthorPage/CreateAuthorPage";
import UpdateAuthorPage from "./pages/Authors/UpdateAuthorPage/UpdateAuthorPage";
import CreateTagPage from "./pages/Tags/CreatePage/CreateTagPage";
import UpdateTagPage from "./pages/Tags/UpdatePage/UpdateTagPage";
import MainBooksPage from "./pages/Books/MainPage/MainBooksPage";
import CreateBookPage from "./pages/Books/CreatePage/CreateBookPage";
import UsersPage from "./pages/Users/MainPage/UsersPage";
import UpdateUserPage from "./pages/Users/UpdatePage/UpdateUserPage";

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
                    <Route path={"tags"}>
                        <Route path={""} element={<TagsPage/>}/>
                        <Route path={"new"} element={<CreateTagPage/>}/>
                        <Route path={":id/edit"} element={<UpdateTagPage/>}/>
                    </Route>
                    <Route path={"books"}>
                        <Route path={""} element={<MainBooksPage/>}/>
                        <Route path={"new"} element={<CreateBookPage/>}/>
                        <Route path={":id/edit"}/>
                    </Route>
                    <Route path={"users"}>
                        <Route path={""} element={<UsersPage/>}/>
                        <Route path={":id/edit"} element={<UpdateUserPage/>}/>
                    </Route>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
  );
};

export default App;
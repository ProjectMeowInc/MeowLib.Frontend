import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPanelPages/AdminPage/AdminPage";
import AuthorPage from "./pages/AdminPanelPages/Authors/MainPage/AuthorPage";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import NotFoundPage from "./pages/AdminPanelPages/Error/NotFoundPage/NotFoundPage";
import TagsPage from "./pages/AdminPanelPages/Tags/MainPage/TagsPage";
import CreateAuthorPage from "./pages/AdminPanelPages/Authors/CreateAuthorPage/CreateAuthorPage";
import UpdateAuthorPage from "./pages/AdminPanelPages/Authors/UpdateAuthorPage/UpdateAuthorPage";
import CreateTagPage from "./pages/AdminPanelPages/Tags/CreatePage/CreateTagPage";
import UpdateTagPage from "./pages/AdminPanelPages/Tags/UpdatePage/UpdateTagPage";
import MainBooksPage from "./pages/AdminPanelPages/Books/MainPage/MainBooksPage";
import CreateBookPage from "./pages/AdminPanelPages/Books/CreatePage/CreateBookPage";
import UsersPage from "./pages/AdminPanelPages/Users/MainPage/UsersPage";
import UpdateUserPage from "./pages/AdminPanelPages/Users/UpdatePage/UpdateUserPage";
import UpdateBooksPage from "./pages/AdminPanelPages/Books/UpdatePage/UpdateBooksPage";
import CreateChapterPage from "./pages/AdminPanelPages/Chapters/CreatePage/CreateChapterPage";
import UpdateChapterPage from "./pages/AdminPanelPages/Chapters/UpdatePage/UpdateChapterPage";
import ChapterInfoPage from "./pages/AdminPanelPages/Chapters/InformationPage/ChapterInfoPage";
import {TagContextProvider} from "./context/TagsContext";
import {AuthorContextProvider} from "./context/AuthorContext";
import UserLayout from "./layouts/UserLayout/UserLayout";
import MainPage from "./pages/UserPages/MainPage/MainPage";

const App = () => {
  return (
        <Routes>
            <Route path={"/"}>
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
                        <Route index element={<MainBooksPage/>}/>
                        <Route path={"new"} element={<CreateBookPage/>}/>
                        <Route path={":bookId/edit"}>
                            <Route index element={
                                <AuthorContextProvider>
                                    <TagContextProvider>
                                        <UpdateBooksPage/>
                                    </TagContextProvider>
                                </AuthorContextProvider>
                            }/>
                            <Route path={"chapter/new"} element={<CreateChapterPage/>}/>
                            <Route path={"chapters/:chapterId/edit"} element={<UpdateChapterPage/>}/>
                            <Route path={"chapters/:chapterId/info"} element={<ChapterInfoPage/>} />
                        </Route>
                    </Route>
                    <Route path={"users"}>
                        <Route index element={<UsersPage/>}/>
                        <Route path={":id/edit"} element={<UpdateUserPage/>}/>
                    </Route>
                </Route>
                <Route path={"/"} element={<UserLayout/>}>
                    <Route index element={<MainPage/>}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
  );
};

export default App;
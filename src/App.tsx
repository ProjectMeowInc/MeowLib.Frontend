import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./components/pages/AuthPages/AuthPage";
import AdminPage from "./components/pages/AdminPanelPages/AdminPage/AdminPage";
import AuthorPage from "./components/pages/AdminPanelPages/Authors/MainPage/AuthorPage";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import NotFoundPage from "./components/pages/AdminPanelPages/Error/NotFoundPage/NotFoundPage";
import TagsPage from "./components/pages/AdminPanelPages/Tags/MainPage/TagsPage";
import CreateAuthorPage from "./components/pages/AdminPanelPages/Authors/CreateAuthorPage/CreateAuthorPage";
import UpdateAuthorPage from "./components/pages/AdminPanelPages/Authors/UpdateAuthorPage/UpdateAuthorPage";
import CreateTagPage from "./components/pages/AdminPanelPages/Tags/CreatePage/CreateTagPage";
import UpdateTagPage from "./components/pages/AdminPanelPages/Tags/UpdatePage/UpdateTagPage";
import MainBooksPage from "./components/pages/AdminPanelPages/Books/MainPage/MainBooksPage";
import CreateBookPage from "./components/pages/AdminPanelPages/Books/CreatePage/CreateBookPage";
import UsersPage from "./components/pages/AdminPanelPages/Users/MainPage/UsersPage";
import UpdateUserPage from "./components/pages/AdminPanelPages/Users/UpdatePage/UpdateUserPage";
import UpdateBooksPage from "./components/pages/AdminPanelPages/Books/UpdatePage/UpdateBooksPage";
import CreateChapterPage from "./components/pages/AdminPanelPages/Chapters/CreatePage/CreateChapterPage";
import UpdateChapterPage from "./components/pages/AdminPanelPages/Chapters/UpdatePage/UpdateChapterPage";
import ChapterInfoPage from "./components/pages/AdminPanelPages/Chapters/InformationPage/ChapterInfoPage";
import {TagContextProvider} from "./context/TagsContext";
import {AuthorContextProvider} from "./context/AuthorContext";
import UserLayout from "./layouts/UserLayout/UserLayout";
import LibraryPage from "./components/pages/UserPages/LibraryPage/LibraryPage";
import BookPage from "./components/pages/UserPages/BookPage/BookPage";
import SettingsPage from "./components/pages/UserPages/SettingsPage/SettingsPage";
import LayoutContentColumn from "./components/UI/LayoutContentColumn/LayoutContentColumn";

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
                    <Route index element={<LayoutContentColumn elements={[<LibraryPage/>]}/> }/>
                    <Route path={"books/:bookId"} element={<BookPage/>}/>
                    <Route path={"favorites"}/>
                    <Route path={"settings"} element={<SettingsPage/>}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
  );
};

export default App;
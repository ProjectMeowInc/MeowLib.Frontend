import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";

const App = () => {
  return (
      <Routes>
        <Route path={"/login"} element={<AuthPage/>}/>
      </Routes>
  );
};

export default App;
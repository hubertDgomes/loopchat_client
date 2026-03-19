import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import MainArea from "./components/layouts/MainArea";
import ProfilePhoto from "./components/pages/ProfilePhoto";
import ChatingArea from "./components/layouts/ChatingArea";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profilephoto" element={<ProfilePhoto/>}/>

        <Route path="/app" element={<RootLayout/>}>
          <Route index element={<MainArea/>}/>
          <Route path="chatingarea/:id" element={<ChatingArea/>}/>
        </Route>

      </Routes>
    </>
  );
};

export default App;

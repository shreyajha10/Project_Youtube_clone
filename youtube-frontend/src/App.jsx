import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home/Home";

import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video/Video";
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUP/SignUp";
import Login from "./Component/Login";
import axios from "axios";
import VideoUpload from "./Pages/VideoUpload/VideoUpload";

function App() {
  const [sidebar, setSidebar] = useState(true);

  const setSideNavbar = (value) => {
    setSidebar(value);
  };
  return (
    <>
      <div className="App">
        <Navbar setSideNavbar={setSideNavbar} sidebar={sidebar} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/watch/:id" element={<Video />} />
          <Route path="/user/:id" element={<Profile sidebar={sidebar} />} />
          <Route path="/:id/upload" element={<VideoUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
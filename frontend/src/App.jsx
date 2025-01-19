import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import "../src/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Member from "./pages/memeber/Member";
import GeneralUser from "./pages/generalUser/GeneralUser";
import MemberDetail from "./pages/memberDetail/MemberDetail";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
      navigate("/dashboard");
    }else{
      setIsLogin(false)
      navigate('/')
    }
  }, [localStorage.getItem("isLogin")]);

  return (
    <div className="flex">
      {isLogin && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/members' element={<Member/> } />
        <Route path="specific/:page" element={<GeneralUser/>} />
        <Route path="member/:id" element={ <MemberDetail/> } />

      </Routes>
    </div>
  );
};

export default App;

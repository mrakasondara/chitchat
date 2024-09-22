import { Routes, Route } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
const ChatApp = () => {
  return (
    <div className="flex flex-col font-suse">
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};
export default ChatApp;

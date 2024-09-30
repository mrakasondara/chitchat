import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserContext } from "../UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase-sdk";
import { logout } from "../firebase/user/user";
import Profile from "../pages/Profile";
const ChatApp = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    const getSession = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { displayName, email, uid } = user;
          setUserInfo({ displayName, email, uid });
        } else {
          setUserInfo(null);
        }
      });
    };
    getSession();
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  if (userInfo) {
    const id = userInfo.uid;
    const displayName = userInfo.displayName;
    return (
      <div className="flex flex-col font-suse">
        <Navbar onLogout={onLogout} />
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route
            path="/profile"
            element={<Profile id={id} displayName={displayName} />}
          ></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col font-suse">
        <Routes>
          <Route index path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    );
  }
};
export default ChatApp;

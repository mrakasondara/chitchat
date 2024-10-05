import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserContext } from "../UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase-sdk";
import { getUserData, logout } from "../firebase/user/user";
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import { getImageFromStorage } from "../firebase/storage";
const ChatApp = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    const getSession = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const { displayName, email, uid } = user;
          const { thumb } = await getUserData(uid);
          if (thumb == "none") {
            setUserInfo({ displayName, email, uid, thumb });
          } else {
            const getImage = await getImageFromStorage(uid);
            setUserInfo({ displayName, email, uid, thumb: getImage });
          }
        } else {
          setUserInfo(null);
        }
      });
    };
    getSession().catch();
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  if (userInfo) {
    const id = userInfo.uid;
    const displayName = userInfo.displayName;
    const thumb = userInfo.thumb;
    return (
      <div className="w-full flex flex-col font-suse">
        <Navbar onLogout={onLogout} thumb={thumb} />
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route
            path="/profile"
            element={
              <Profile id={id} displayName={displayName} thumb={thumb} />
            }
          ></Route>
          <Route path="/chat/:id" element={<Chat userId={id} />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col font-suse">
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

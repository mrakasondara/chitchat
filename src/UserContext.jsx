import { createContext, useState } from "react";
export const UserContext = createContext({});
const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [searchChatInput, setSearchChatInput] = useState("");
  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, searchChatInput, setSearchChatInput }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

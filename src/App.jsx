import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./UserContext";
import ChatApp from "./components/ChatApp";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ChatApp />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

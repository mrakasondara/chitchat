import { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../../UserContext";
import RecentList from "./RecentList";
import {
  getHighlightChat,
  searchChatByUserName,
} from "../../firebase/chat/chat";
const RecentChat = () => {
  const { userInfo, searchChatInput, setSearchChatInput } =
    useContext(UserContext);
  const [chats, setChats] = useState({});
  const [filteredChats, setFilteredChats] = useState({});
  const [message, setMessage] = useState("");
  const [errorFetch, setErrorFetch] = useState(false);
  useEffect(() => {
    const fetchChat = async () => {
      const { error, message, data } = await getHighlightChat(userInfo.uid);
      if (error) {
        setErrorFetch(true);
        setMessage(message);
      } else {
        const filterData = searchChatByUserName({
          chats: data,
          keyword: searchChatInput,
        });
        setFilteredChats(filterData);
        setChats(data);
        setErrorFetch(false);
      }
    };

    if (userInfo.uid) {
      fetchChat().catch();
    }
  }, [userInfo, searchChatInput]);
  return (
    <div className=" py-5 px-[1.9rem] rounded-t-xl">
      <h4 className="text-xl">Recent Chat</h4>
      {searchChatInput != "" && (
        <p className="my-2 alert border-info bg-transparent text-black">
          Search By Name{" "}
          <span className="text-main -ml-3">"{searchChatInput}"</span>
          <button
            className="mr-3 text-red-500"
            onClick={() => setSearchChatInput("")}
          >
            clear
          </button>
        </p>
      )}
      <Suspense fallback={<p>Loading...</p>}>
        {errorFetch && (
          <p className="mt-5 text-2xl text-error font-bold">{message}</p>
        )}
        {!errorFetch && <RecentList chats={filteredChats} />}
      </Suspense>
    </div>
  );
};
export default RecentChat;

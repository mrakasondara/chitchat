import { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../../UserContext";
import RecentList from "./RecentList";
import { getHighlightChat } from "../../firebase/chat/chat";

const RecentChat = () => {
  const { userInfo } = useContext(UserContext);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState("");
  const [errorFetch, setErrorFetch] = useState(false);
  useEffect(() => {
    const fetchChat = async () => {
      const { error, message, data } = await getHighlightChat(userInfo.uid);
      if (error) {
        setErrorFetch(true);
        setMessage(message);
      } else {
        setChats(data);
        setErrorFetch(false);
      }
    };

    if (userInfo.uid) {
      fetchChat().catch();
    }
  }, [userInfo]);
  return (
    <div className=" py-5 px-[1.9rem] rounded-t-xl">
      <h4 className="text-xl">Recent Chat</h4>
      <Suspense fallback={<p>Loading...</p>}>
        {errorFetch && (
          <p className="mt-5 text-2xl text-error font-bold">{message}</p>
        )}
        {!errorFetch && <RecentList chats={chats} />}
      </Suspense>
    </div>
  );
};
export default RecentChat;

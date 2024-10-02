import { IoPersonRemove } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { rejectRequest } from "../../firebase/user/user";
import { AlertSuccess } from "../../utils/Alert";
import { initialChatUserDatabase } from "../../firebase/chat/chat";

const FriendItem = ({ id, displayName, myId, chat }) => {
  const navigate = useNavigate();
  const onRemove = async () => {
    await rejectRequest({ myId, targetId: id });
    AlertSuccess("User has been removed");
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  const onStartChat = async () => {
    const chatId = await initialChatUserDatabase({ myId, targetId: id });
    setTimeout(() => {
      navigate(`/chat/${chatId}`);
    }, 1500);
  };

  return (
    <div className="w-full p-4 flex gap-5 shadow-lg rounded-md" key={id}>
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="grid items-center">
        <h3 className="font-bold text-lg text-main">{displayName}</h3>
        <p className="text-[11px]">#{id.substring(1, 6)}</p>
      </div>
      <div className="ml-auto flex gap-3 p-2">
        <button
          className="tooltip tooltip-top flex items-center justify-center rounded-full w-10 bg-error text-lg text-white text-center"
          data-tip="remove user"
          onClick={() => onRemove()}
        >
          <IoPersonRemove />
        </button>
        {chat != "started" && (
          <button
            onClick={() => onStartChat()}
            className="tooltip tooltip-top flex items-center justify-center rounded-full w-10 bg-success text-lg text-white text-center"
            data-tip="start chat"
          >
            <IoMdChatboxes />
          </button>
        )}
      </div>
    </div>
  );
};
export default FriendItem;

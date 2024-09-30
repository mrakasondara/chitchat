import { IoPersonRemove } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";
import { rejectRequest } from "../../firebase/user/user";
import { AlertSuccess } from "../../utils/Alert";

const FriendItem = ({ id, displayName, myId }) => {
  const onRemove = async () => {
    await rejectRequest({ myId, targetId: id });
    AlertSuccess("User has been removed");
    setTimeout(() => {
      location.reload();
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
        <Link
          to={`/chat/1234`}
          className="tooltip tooltip-top flex items-center justify-center rounded-full w-10 bg-success text-lg text-white text-center"
          data-tip="start chat"
        >
          <IoMdChatboxes />
        </Link>
      </div>
    </div>
  );
};
export default FriendItem;

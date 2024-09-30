import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { acceptRequest, rejectRequest } from "../../firebase/user/user";
import { AlertSuccess } from "../../utils/Alert";

const RequestItem = ({ id, displayName, myId }) => {
  const onAccept = async () => {
    const { message } = await acceptRequest({ myId, targetId: id });
    AlertSuccess(message);
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  const onReject = async () => {
    const { message } = await rejectRequest({ myId, targetId: id });
    AlertSuccess(message);
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  return (
    <div className="w-full p-4 flex gap-3 shadow-lg rounded-md" key={id}>
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
          data-tip="reject user"
          onClick={() => {
            onReject();
          }}
        >
          <IoPersonRemoveSharp />
        </button>
        <button
          className="tooltip tooltip-top flex items-center justify-center rounded-full w-10 bg-success text-lg text-white text-center"
          data-tip="accept user"
          onClick={() => {
            onAccept();
          }}
        >
          <IoMdPersonAdd />
        </button>
      </div>
    </div>
  );
};
export default RequestItem;

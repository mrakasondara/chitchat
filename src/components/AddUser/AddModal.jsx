import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { addFriend, isUserExist } from "../../firebase/user/user";
import useInput from "../../hooks/useInput";

const AddModal = () => {
  const [friendCode, onFriendCodeChange] = useInput("#");
  const { setUserInfo, userInfo } = useContext(UserContext);

  const onSearch = async (ev, friendCode) => {
    ev.preventDefault();
    const { length, id } = await isUserExist(friendCode);
    const myId = userInfo.uid;

    if (length && id != myId) {
      const { success, message } = await addFriend({ myId, targetId: id });
      if (!success) {
        console.error(message);
      } else {
        console.log(message);
      }
    } else {
      console.error("User not found!");
    }
  };
  return (
    <dialog id="add-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-main">
        <h3 className="font-bold text-lg text-white">Add User !</h3>
        <form action="" className="mt-3 flex flex-col">
          <input
            type="text"
            placeholder="Add User By Friend Code"
            className="input input-bordered w-full bg-white text-primary"
            value={friendCode}
            onChange={onFriendCodeChange}
            maxLength="7"
          />
          <button
            className="btn mt-2 ml-auto w-25 bg-success hover:bg-white hover:text-success text-white btn-outline"
            onClick={(ev) => onSearch(ev, friendCode)}
          >
            Add User
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AddModal;

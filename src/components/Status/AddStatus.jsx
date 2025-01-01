import { useContext, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { UserContext } from "../../UserContext";
import { AlertError, AlertSuccess } from "../../utils/Alert";

const AddStatus = ({ addStatus }) => {
  const [image, setImage] = useState(null);
  const [desc, onDescChange, setDesc] = useInput();
  const [imagePath, setImagePath] = useState("");
  const { userInfo } = useContext(UserContext);
  const { uid, displayName } = userInfo;

  useEffect(() => {
    setImage(image);
  }, [image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      return;
    }
    setImagePath(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const addStatusHandler = async (e) => {
    e.preventDefault();
    const { error, message } = await addStatus({
      thumb: imagePath,
      desc,
      uid,
      displayName,
    });
    if (error) {
      AlertError(message);
    } else {
      setDesc("");
      setImage(null);
      document.getElementById("add-status-modal").close();
      AlertSuccess(message);
    }
  };

  return (
    <dialog id="add-status-modal" className="modal bg-status ">
      <div className="modal-box w-11/12 max-w-3xl min-h-[25rem] bg-white mx-auto overflow-hidden">
        <h3 className="font-bold text-2xl text-main text-center">Add Status</h3>
        <img
          src={image == null ? "preview.webp" : image}
          className="w-3/4 md:w-2/4 h-[13rem] mx-auto my-5 rounded-lg cursor-pointer"
        />
        <form className="grid justify-center gap-5">
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full file-input-sm bg-white max-w-xs"
            accept="image/*"
            onChange={(e) => onSelectFile(e)}
          />
          <div className="w-full flex gap-4">
            <input
              type="text"
              placeholder="Add Text"
              className="input input-ghost w-full max-w-xs focus:bg-white focus:text-main focus:outline-main placeholder:text-main"
              value={desc}
              onChange={onDescChange}
            />
            <button
              className="btn bg-main text-white border-main hover:border-1 hover:border-main hover:text-main hover:bg-white"
              onClick={(e) => addStatusHandler(e)}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AddStatus;

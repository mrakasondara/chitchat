import { IoMdSend } from "react-icons/io";
import useInput from "../../hooks/useInput";

const SendMessage = ({ onSubmit }) => {
  const [message, onMessageChange] = useInput();
  return (
    <form className="w-full flex justify-around md:justify-center md:gap-3 fixed bottom-0 bg-main p-3">
      <input
        type="text"
        className="w-3/4 md:w-1/2 p-3 rounded-lg bg-white text-main shadow-lg"
        placeholder="message"
        value={message}
        onChange={onMessageChange}
        minLength="1"
      />
      <button
        className="avatar"
        onClick={(e) => {
          onSubmit({ e, message });
        }}
      >
        <div className="w-14 shadow-lg border border-slate-400 relative rounded-full">
          <span className="text-2xl  text-white absolute top-4 left-5">
            <IoMdSend />
          </span>
        </div>
      </button>
    </form>
  );
};
export default SendMessage;

import { IoMdSend } from "react-icons/io";
import useInput from "../../hooks/useInput";

const SendMessage = ({ onSubmit }) => {
  const [message, onMessageChange, setMessage] = useInput();
  return (
    <form className="w-full flex justify-around md:justify-center md:gap-3 mt-auto bg-main p-3">
      <input
        type="text"
        className="w-3/4 md:w-1/2 h-3/4 my-auto p-3 rounded-lg bg-white text-main shadow-lg"
        placeholder="message"
        value={message}
        onChange={onMessageChange}
        minLength="1"
      />
      <button
        className="avatar"
        onClick={(e) => {
          onSubmit({ e, message });
          setMessage("");
        }}
      >
        <span className="text-2xl text-center text-white border rounded-full p-2 ml-0 md:ml-2 border-slate-400">
          <IoMdSend />
        </span>
      </button>
    </form>
  );
};
export default SendMessage;

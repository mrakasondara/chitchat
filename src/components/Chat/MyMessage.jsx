const MyMessage = ({ message, time }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-main text-white flex flex-col px-5">
        <p>{message}</p>
        <span className="text-[9px] text-slate-50 ml-auto">{time}</span>
      </div>
    </div>
  );
};
export default MyMessage;

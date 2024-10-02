const TargetMessage = ({ message, time }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-main text-white px-5 flex flex-col">
        <p>{message}</p>
        <span className="text-[9px] text-slate-50">{time}</span>
      </div>
    </div>
  );
};
export default TargetMessage;

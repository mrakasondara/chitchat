const TargetMessage = ({ message, time, date }) => {
  const dateMessage = new Date(date);
  const dateMonthYearMessage = `${dateMessage.getDate()}/${dateMessage.getMonth()}/${dateMessage.getFullYear()}`;

  const thisDay = new Date();
  const dateMonthYear = `${thisDay.getDate()}/${thisDay.getMonth()}/${thisDay.getFullYear()}`;

  const isTheDay = dateMonthYearMessage == dateMonthYear;
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-main text-white px-5 flex flex-col">
        <p className="text-[17px] font-poppins">{message}</p>
        <span className="text-[9px] text-slate-50 ml-auto mt-1">
          {isTheDay ? time : `${dateMonthYearMessage} ${time}`}
        </span>
      </div>
    </div>
  );
};
export default TargetMessage;

const ChatHeader = ({ displayName }) => {
  return (
    <div className="w-full flex items-center gap-5 shadow-lg bg-main p-3 sticky top-0 z-20">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <h3 className="text-2xl text-white font-bold">{displayName}</h3>
    </div>
  );
};
export default ChatHeader;

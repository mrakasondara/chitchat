const ChatHeader = ({ displayName, thumb }) => {
  return (
    <div className="w-full flex items-center gap-5 shadow-lg bg-main p-3 sticky top-0 z-20">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img
            src={
              thumb == "none"
                ? "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : thumb
            }
          />
        </div>
      </div>
      <h3 className="text-2xl text-white font-bold">{displayName}</h3>
    </div>
  );
};
export default ChatHeader;

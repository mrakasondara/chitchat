const StatusItem = ({ thumb, displayName, id, isRead = false }) => {
  const showStatus = () => {
    document.getElementById(`show-status-modal-${id}`).show();
  };

  return (
    <div
      className="avatar flex flex-col block w-20 items-center snap-always snap-center"
      onClick={showStatus}
    >
      <div
        className={`w-20 rounded-full ${
          isRead
            ? `border-main border-2 cursor-pointer border-main border-2 border-slate-100`
            : `border-main border-2 cursor-pointer `
        }`}
      >
        <img src={thumb != "none" ? thumb : "/preview.webp"} alt="thumb" />
      </div>
      <h5 className="text-main font-semibold">{displayName}</h5>
    </div>
  );
};
export default StatusItem;

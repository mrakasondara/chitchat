const StatusItem = ({ image, name, isRead }) => {
  const showStatus = () => {
    document.getElementById("show-status-modal").show();
  };
  return (
    <div
      className="avatar flex flex-col block w-20 items-center"
      onClick={showStatus}
    >
      <div
        className={`w-20 rounded-full ${
          isRead
            ? "border-main border-2 cursor-pointer"
            : "border-slate-300 border-2"
        }`}
      >
        <img src={image} />
      </div>
      <h5 className="text-main font-semibold">{name}</h5>
    </div>
  );
};
export default StatusItem;

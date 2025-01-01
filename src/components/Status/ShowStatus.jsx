const ShowStatus = ({ displayName, date, desc, thumb, id }) => {
  const statusDate = new Date(date);
  const time = `${statusDate.getHours()}:${statusDate.getMinutes()}`;
  return (
    <dialog id={`show-status-modal-${id}`} className="modal bg-status">
      <div className="modal-box w-11/12 max-w-5xl h-[25rem] bg-white mx-auto overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-2xl text-main">{displayName}</h3>
          <p className="text-sm text-black">{time}</p>
        </div>
        {thumb != "none" && (
          <img
            src={thumb}
            className="w-3/4 md:w-[45%] h-[13rem] mx-auto my-5 rounded-lg"
          />
        )}
        <p className="text-center text-black">{desc}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default ShowStatus;

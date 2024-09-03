const ShowStatus = () => {
  return (
    <dialog id="show-status-modal" className="modal bg-status">
      <div className="modal-box w-11/12 max-w-5xl h-[25rem] bg-white mx-auto overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-2xl text-main">John</h3>
          <p className="text-sm text-black">13:59</p>
        </div>
        <img
          src="preview.webp"
          className="w-3/4 md:w-[45%] h-[13rem] mx-auto my-5 rounded-lg cursor-pointer"
        />
        <p className="text-center text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          fugit.
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default ShowStatus;

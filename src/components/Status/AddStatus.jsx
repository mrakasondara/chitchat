const AddStatus = () => {
  return (
    <dialog id="add-status-modal" className="modal bg-status ">
      <div className="modal-box w-11/12 max-w-3xl h-[25rem] bg-white mx-auto overflow-hidden">
        <h3 className="font-bold text-2xl text-main text-center">Add Status</h3>
        <img
          src="preview.webp"
          className="w-3/4 md:w-2/4 h-[13rem] mx-auto my-5 rounded-lg cursor-pointer"
        />
        <form action="" className="flex justify-center gap-5">
          <input
            type="text"
            placeholder="Add Text"
            className="input input-ghost w-full max-w-xs focus:bg-white focus:text-main focus:outline-main placeholder:text-main"
          />
          <button className="btn bg-main text-white border-main hover:border-1 hover:border-main hover:text-main hover:bg-white">
            Send
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AddStatus;

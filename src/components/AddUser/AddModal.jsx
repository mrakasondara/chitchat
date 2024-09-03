const AddModal = () => {
  return (
    <dialog id="add-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-main">
        <h3 className="font-bold text-lg text-white">Add User !</h3>
        <form action="" className="mt-3 flex flex-col">
          <input
            type="text"
            placeholder="Add User By Id"
            className="input input-bordered w-full bg-white text-primary"
          />
          <button className="btn mt-2 ml-auto w-20 bg-success hover:bg-white text-white btn-outline">
            Add User
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AddModal;

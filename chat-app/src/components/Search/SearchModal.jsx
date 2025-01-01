import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

const SearchModal = () => {
  const { setSearchChatInput } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");

  const onSearchButton = () => {
    setSearchChatInput(searchInput);
  };

  return (
    <dialog id="search-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-main">
        <h3 className="font-bold text-lg text-white">Search User !</h3>
        <form action="" className="mt-3 flex flex-col">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full bg-white text-primary"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="btn mt-2 ml-auto w-20 bg-m hover:bg-white text-white btn-outline"
            onClick={(ev) => {
              ev.preventDefault();
              onSearchButton();
            }}
          >
            Search
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" action="">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default SearchModal;

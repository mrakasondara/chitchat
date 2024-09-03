const SearchModal = () =>{
    return (
        <dialog id="search-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-primary">
                <h3 className="font-bold text-lg text-white">Search User !</h3>
                <form action="" className="mt-3 flex flex-col">
                    <input type="text" placeholder="Search" className="input input-bordered w-full bg-white text-primary" />
                    <button className="btn mt-2 ml-auto w-20 bg-success hover:bg-white text-white btn-outline">Search</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
export default SearchModal
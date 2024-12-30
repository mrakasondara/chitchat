import StatusDataGroup from "./StatusDataGroup";
import StatusGroupNavigator from "./StatusGroupNavigator";

const ShowStatusItemGroup = ({ id, statuses, groupId }) => {
  console.log(statuses);
  return (
    <dialog id={`show-status-modal-${id}`} className="modal bg-status">
      <div className="w-3/4 carousel px-5 rounded-lg">
        {statuses.map((status, index) => (
          <StatusDataGroup {...status} key={index} />
        ))}
      </div>
      <div className="flex">
        {groupId.map((group, index) => (
          <StatusGroupNavigator {...group} key={index} index={index++} />
        ))}
      </div>
      <form method="dialog" className="mt-2 modal-backdrop z-[999]">
        <button className="text-red-500">
          {/* <span className="material-symbols-outlined">close</span> */}
          <span className="material-icons text-[2rem]">close</span>
        </button>
      </form>
    </dialog>
  );
};
export default ShowStatusItemGroup;

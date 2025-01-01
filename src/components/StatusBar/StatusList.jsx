import { _, groupBy } from "lodash";
import ShowStatus from "../Status/ShowStatus";
import AddStatusModal from "./AddStatusModal";
import RefreshButton from "./RefreshButton";
import StatusItem from "./StatusItem";
import ShowStatusItemGroup from "../Status/ShowStatusItemGroup";
const StatusList = ({ statuses, setStatuses }) => {
  const groupStatusById = Object.values(_.groupBy(statuses, "userId"));
  let singleStatus;
  let groupStatus;
  let groupStatusId = [];
  for (const group of groupStatusById) {
    if (group.length > 1) {
      groupStatus = group;
      groupStatus.forEach((status) => {
        groupStatusId.push({ id: status.id });
      });
    } else {
      singleStatus = group;
    }
  }
  return (
    <div className="flex gap-5">
      <AddStatusModal />
      {statuses == [] ? (
        <p className="text-red-300 flex items-center">No Status</p>
      ) : (
        ""
      )}
      {singleStatus?.length > 0 &&
        singleStatus.map((status, index) => (
          <div key={status.id}>
            <StatusItem {...status} key={status.id} />
            <ShowStatus {...status} key={status.id + index} />
          </div>
        ))}
      {groupStatus?.length > 0 && (
        <div>
          <StatusItem {...groupStatus[0]} key={groupStatus[0].id} />
          <ShowStatusItemGroup
            id={groupStatus[0].id}
            statuses={groupStatus}
            groupId={groupStatusId}
          />
        </div>
      )}
      <RefreshButton setStatuses={setStatuses} />
    </div>
  );
};
export default StatusList;

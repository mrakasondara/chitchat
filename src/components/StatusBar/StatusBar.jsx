import StatusList from "./StatusList";

const StatusBar = ({ statuses, setStatuses }) => {
  const propsStatusList = { statuses, setStatuses };
  return (
    <div className="flex flex-col py-5 px-[2rem] gap-2">
      <h4 className="text-black tracking-widest">STATUS</h4>
      <StatusList {...propsStatusList} />
    </div>
  );
};
export default StatusBar;

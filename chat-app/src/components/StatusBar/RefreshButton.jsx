import { useContext } from "react";
import { getStatuses } from "../../firebase/status/status";
import { UserContext } from "../../UserContext";

const RefreshButton = ({ setStatuses }) => {
  const { userInfo } = useContext(UserContext);

  const updateStatus = () => {
    const fetchStatuses = async () => {
      const response = await getStatuses(userInfo.uid);
      if (response) {
        setStatuses(response.data);
      }
    };
    fetchStatuses().catch();
  };
  return (
    <div
      className="avatar flex flex-col block w-20 items-center md:tooltip"
      onClick={updateStatus}
      data-tip="refresh status"
    >
      <div className="flex w-20 rounded-full bg-main hover:bg-white hover:border hover:border-main text-center items-center hover:cursor-pointer text-white hover:text-main">
        <i className="text-4xl my-[1rem] material-icons pt-1">refresh</i>
      </div>
    </div>
  );
};
export default RefreshButton;

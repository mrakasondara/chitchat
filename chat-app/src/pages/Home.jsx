import React, { useEffect, useState, useContext } from "react";
import RecentChat from "../components/RecentChat/RecentChat";
import {
  addStatus,
  deleteExpiredStatus,
  getStatuses,
} from "../firebase/status/status";
import { UserContext } from "../UserContext";
import AddStatus from "../components/Status/AddStatus";
import ShowStatus from "../components/Status/ShowStatus";
import StatusBar from "../components/StatusBar/StatusBar";

const Home = () => {
  const { userInfo } = useContext(UserContext);
  const [statuses, setStatuses] = useState([]);
  const statusBarProps = { statuses, setStatuses };
  const ENDPOINT = process.env.API_BASE_URL;
  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await getStatuses(userInfo.uid);
      if (response) {
        setStatuses(response.data);
      }
    };
    if (userInfo.uid) {
      fetchStatuses().catch();
      if (statuses.length) {
        statuses.forEach((status) => {
          deleteExpiredStatus({
            userId: status.userId,
            statusDateExpire: status.dateExpire,
            id: status.id,
          });
        });
      }
    }
  }, [ENDPOINT]);

  return (
    <>
      <StatusBar {...statusBarProps} />
      <RecentChat />
      <ShowStatus />
      <AddStatus addStatus={addStatus} />
    </>
  );
};
export default Home;

import React, { useEffect, useState, useContext } from "react";
import RecentChat from "../components/RecentChat/RecentChat";
import { addStatus, getStatuses } from "../firebase/status/status";
import { UserContext } from "../UserContext";
import AddStatus from "../components/Status/AddStatus";
import ShowStatus from "../components/Status/ShowStatus";
import StatusBar from "../components/StatusBar/StatusBar";

const Home = () => {
  const { userInfo } = useContext(UserContext);
  const [statuses, setStatuses] = useState([]);
  const statusBarProps = { statuses, setStatuses };
  const ENDPOINT = "http://localhost:3000/";

  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await getStatuses(userInfo.uid);
      if (response) {
        setStatuses(response.data);
      }
    };
    if (userInfo.uid) {
      fetchStatuses().catch();
      console.log(statuses);
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

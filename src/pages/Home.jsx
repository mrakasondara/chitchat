import StatusBar from "../components/StatusBar/StatusBar";
import RecentChat from "../components/RecentChat/RecentChat";
import AddStatus from "../components/Status/AddStatus";
import ShowStatus from "../components/Status/ShowStatus";
const Home = () => {
  return (
    <>
      <StatusBar />
      <RecentChat />
      <AddStatus />
      <ShowStatus />
    </>
  );
};
export default Home;

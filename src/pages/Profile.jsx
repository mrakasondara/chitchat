import { Suspense, useEffect, useState } from "react";
import FriendRequests from "../components/Profile/FriendRequests";
import FriendList from "../components/Profile/FriendList";
import { getFriendByStatus } from "../firebase/user/user";

const Profile = ({ id, displayName }) => {
  const [friendRequests, setFriendRequests] = useState({});
  const [friendList, setFriendList] = useState({});
  useEffect(() => {
    const getFriendRequests = async () => {
      const friendRequests = await getFriendByStatus({
        id: id,
        status: "request",
      });
      setFriendRequests(friendRequests);
    };

    const getFriendList = async () => {
      const friendList = await getFriendByStatus({
        id: id,
        status: "accept",
      });
      setFriendList(friendList);
    };

    if (id) {
      getFriendRequests().catch(console.error);
      getFriendList().catch(console.error);
    }
  }, [id]);

  return (
    <div className="w-3/4 md:w-1/2 my-5 mx-auto">
      <div className="w-full flex gap-2 flex-col bg-slate-100 shadow-lg p-5 rounded-lg">
        <img src="profile.jpg" alt="profile image" className="mx-auto w-1/2" />
        <h1 className="text-xl text-main text-center">{displayName}</h1>
        <p className="text-slate-40 text-sm text-center">
          #{id ? id.substring(0, 6) : ""}
        </p>
        <Suspense fallback={<p>Loading ...</p>}>
          <FriendRequests requests={friendRequests} myId={id ? id : ""} />
          <FriendList requests={friendList} myId={id ? id : ""} />
        </Suspense>
      </div>
    </div>
  );
};
export default Profile;

import { useContext } from "react";
import { UserContext } from "../UserContext";

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="w-full">
      <h1 className="text-xl">Profile</h1>
      <p>{userInfo.displayName}</p>
    </div>
  );
};
export default Profile;

import { Suspense, useEffect, useState } from "react";
import FriendRequests from "../components/Profile/FriendRequests";
import FriendList from "../components/Profile/FriendList";
import { getFriendByStatus, updateUserThumbData } from "../firebase/user/user";
import ImageThumb from "../components/Profile/Image/ImageThumb";
import UpdateImage from "../components/Profile/Image/UpdateImage";
import { addImageToStorage } from "../firebase/storage";
import useInput from "../hooks/useInput";

const Profile = ({ id, displayName, thumb }) => {
  const [friendRequests, setFriendRequests] = useState({});
  const [friendList, setFriendList] = useState({});
  const [image, setImage] = useState("");
  const [imagePath, onImagePathChage, setImagePath] = useInput();
  const [imageDb, onImageChange, setImageDb] = useInput("false");

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
    setImage(thumb);
  }, [id, thumb]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(thumb);
      return;
    }
    setImagePath(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageDb(false);
  };

  const onUpdateImage = async (e) => {
    e.preventDefault();
    await addImageToStorage(imagePath, id);
    await updateUserThumbData({ userId: id, thumb: imagePath });
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  return (
    <div className="w-3/4 md:w-1/2 my-5 mx-auto">
      <div className="w-full flex gap-2 flex-col bg-slate-100 shadow-lg p-5 rounded-lg">
        <ImageThumb
          image={image}
          imageDb={imageDb}
          setImageDb={setImageDb}
          id={id}
        />
        <UpdateImage onSelect={onSelectFile} onUpdate={onUpdateImage} />

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

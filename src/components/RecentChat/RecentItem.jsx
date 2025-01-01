import { Link } from "react-router-dom";
import { getUserThumbData } from "../../firebase/user/user";
import { useEffect, useState } from "react";
import { getImageFromStorage } from "../../firebase/storage";

const RecentItem = ({ displayName, id, lastTime, latestMessage, targetId }) => {
  const [thumb, setThumb] = useState("");
  useEffect(() => {
    const getThumb = async () => {
      const thumb = await getUserThumbData(targetId);
      if (thumb == "none") {
        setThumb(thumb);
      } else {
        const getImage = await getImageFromStorage(targetId);
        setThumb(getImage);
      }
    };
    getThumb().catch();
  }, [targetId]);
  return (
    <Link
      to={`/chat/${id}`}
      className="w-full md:w-1/2 md:mx-auto flex gap-2 p-3 md:p-5 shadow-md shadow-slate-300 rounded-lg bg-main"
    >
      <div className="avatar block w-20 items-center">
        <div className="w-20 rounded-full">
          <img
            src={
              thumb == "none"
                ? "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : thumb
            }
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 justify-center">
        <div className="flex">
          <h5 className="text-white text-2xl font-bold">{displayName}</h5>
          <span className="ml-auto font-bold text-[10px]">{lastTime}</span>
        </div>
        <p className="text-white text-[12px] font-suse">{latestMessage}</p>
      </div>
    </Link>
  );
};
export default RecentItem;

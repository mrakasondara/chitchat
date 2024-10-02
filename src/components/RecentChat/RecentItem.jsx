import { Link } from "react-router-dom";

const RecentItem = ({ displayName, id, lastTime, latestMessage }) => {
  return (
    <Link
      to={`/chat/${id}`}
      className="w-full md:w-1/2 md:mx-auto flex gap-2 p-3 md:p-5 shadow-md rounded-lg "
    >
      <div className="avatar block w-20 items-center">
        <div className="w-20 rounded-full">
          <img src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex">
          <h5 className="text-main font-bold">{displayName}</h5>
          <span className="ml-auto text-[10px]">{lastTime}</span>
        </div>
        <p className="text-black text-[12px]">{latestMessage}</p>
      </div>
    </Link>
  );
};
export default RecentItem;

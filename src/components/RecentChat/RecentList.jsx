import RecentItem from "./RecentItem";

const RecentList = ({ chats }) => {
  return (
    <div className="w-full mt-5 grid gap-[2rem]">
      {chats.length >= 1 &&
        chats.map((chat) => <RecentItem key={chat.id} {...chat} />)}
    </div>
  );
};
export default RecentList;

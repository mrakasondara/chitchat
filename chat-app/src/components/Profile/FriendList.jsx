import { Suspense } from "react";
import FriendItem from "./FriendItem";

const FriendList = ({ friends, myId }) => {
  return (
    <div className="w-full grid">
      <h2 className="font-bold text-main text-lg">
        {friends != null && <span>Friend List ({friends.length})</span>}
        {friends == null && <span>Friend List (0)</span>}
      </h2>
      {friends != null && (
        <Suspense fallback={<p>Loading ...</p>}>
          {friends.length >= 1 &&
            friends.map((req) => (
              <FriendItem {...req} key={req.id} myId={myId} />
            ))}
        </Suspense>
      )}
    </div>
  );
};
export default FriendList;

import { Suspense } from "react";
import FriendItem from "./FriendItem";

const FriendList = ({ requests, myId }) => {
  return (
    <div className="w-full grid">
      <h2 className="font-bold text-main text-lg">
        {requests != null && <span>Friend List ({requests.length})</span>}
        {requests == null && <span>Friend List (0)</span>}
      </h2>
      {requests != null && (
        <Suspense fallback={<p>Loading ...</p>}>
          {requests.length >= 1 &&
            requests.map((req) => (
              <FriendItem {...req} key={req.id} myId={myId} />
            ))}
        </Suspense>
      )}
    </div>
  );
};
export default FriendList;

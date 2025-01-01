import { Suspense } from "react";
import RequestItem from "./RequestItem";

const FriendRequests = ({ requests, myId }) => {
  return (
    <div className="w-full grid">
      <h2 className="font-bold text-main text-lg">
        {requests != null && <span>Friend Request ({requests.length})</span>}
        {requests == null && <span>Friend Request (0)</span>}
      </h2>
      {requests != null && (
        <Suspense fallback={<p>Loading ...</p>}>
          {requests.length >= 1 &&
            requests.map((req) => (
              <RequestItem {...req} key={req.id} myId={myId} />
            ))}
        </Suspense>
      )}
    </div>
  );
};
export default FriendRequests;

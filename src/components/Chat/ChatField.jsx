import TargetMessage from "./TargetMessage";
import MyMessage from "./MyMessage";

const ChatField = ({ messages, userId, targetId }) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="h-full overflow-y-auto p-2">
      {sortedMessages.map((message) => {
        if (message.senderId == userId)
          return <MyMessage key={message.messageId} {...message} />;
        return <TargetMessage key={message.messageId} {...message} />;
      })}
    </div>
  );
};
export default ChatField;

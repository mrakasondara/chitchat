const {
  get,
  set,
  child,
  getDatabase,
  ref,
  push,
} = require("firebase/database");
const { getChatUserData, getUserChatData } = require("../user/user");

const app = require("../firebase-sdk");

const database = getDatabase(app);
const rootReference = ref(database);

const sendMessage = async ({ chatId, myId, targetId, message }) => {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const lastTime = `${getHours}:${getMinutes}`;
  const latestMessage = message;

  await addMessageToChats({ message, chatId, myId, time: lastTime, date });
  await updateLastTimeMessageAtUsers({
    myId,
    targetId,
    latestMessage,
    lastTime,
  });

  await updateLastTimeMessageAtChats({
    chatId,
    myId,
    targetId,
    latestMessage,
    lastTime,
  });
};

const updateLastTimeMessageAtUsers = async ({
  myId,
  targetId,
  latestMessage,
  lastTime,
}) => {
  const myPath = child(rootReference, `users/${myId}/chats/${targetId}`);
  const targetPath = child(rootReference, `users/${targetId}/chats/${myId}`);

  // update my chat at users data
  const myValue = await getUserChatData(myId);
  const myObjectValue = Object.values(myValue).filter(
    (item) => item.targetId == targetId
  );
  const myNewData = {
    ...myObjectValue[0],
    lastTime,
    latestMessage,
  };
  // update target chat at users data
  const targetValue = await getUserChatData(targetId);
  const targetObjectValue = Object.values(targetValue).filter(
    (item) => item.targetId == myId
  );
  const targetNewData = {
    ...targetObjectValue[0],
    lastTime,
    latestMessage,
  };

  await set(myPath, myNewData);
  await set(targetPath, targetNewData);
};
const updateLastTimeMessageAtChats = async ({
  chatId,
  myId,
  targetId,
  latestMessage,
  lastTime,
}) => {
  const myPath = child(rootReference, `chats/${chatId}/users/${myId}`);
  const targetPath = child(rootReference, `chats/${chatId}/users/${targetId}`);

  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();

  // update my chat at users data
  const myValue = await getChatUserData({ chatId, userId: myId });
  const myNewData = {
    ...myValue,
    latestMessage,
    lastTime,
  };

  // update target chat at users data
  const targetValue = await getChatUserData({ chatId, userId: targetId });
  const targetNewData = {
    ...targetValue,
    latestMessage,
    lastTime,
  };

  // await set(myPath, myNewData);
  // await set(targetPath, targetNewData);
};

const addMessageToChats = async ({ message, chatId, myId, time, date }) => {
  const dbPath = child(rootReference, `chats/${chatId}/users/${myId}`);
  const getKey = push(dbPath).key;
  const setPath = child(
    rootReference,
    `chats/${chatId}/users/${myId}/chats/${getKey}`
  );

  const value = {
    messageId: getKey,
    message,
    time,
    senderId: myId,
    date: String(date),
  };

  return await set(setPath, value);
};

const checkIsMessageExist = ({ chatId, userId }) => {
  return get(child(rootReference, `chats/${chatId}/users/${userId}/chats`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err;
    });
};

const getChat = async ({ chatId, userId }) => {
  const isExist = await checkIsMessageExist({ chatId, userId });
  if (isExist) {
    return await getChatsFromDatabase({ chatId, userId });
  } else {
    return [];
  }
};

const getChatsFromDatabase = async ({ chatId, userId }) => {
  const dbPath = child(rootReference, `chats/${chatId}/users/${userId}/chats`);
  const dbGet = await get(dbPath);
  const value = dbGet.val();
  const objectValue = Object.values(value);
  return objectValue;
};

module.exports = { checkIsMessageExist, sendMessage, getChat };

import { get, set, child, getDatabase, ref, push } from "firebase/database";
import { getChatUserData, getUserChatData, getUserData } from "../user/user";
import app from "../firebase-sdk";

const database = getDatabase(app);
const rootReference = ref(database);

const initialChatUserDatabase = async ({ myId, targetId }) => {
  const myDbPath = child(rootReference, `users/${myId}/chats/${targetId}`);
  const targetDbPath = child(rootReference, `users/${targetId}/chats/${myId}`);

  await flagChatHasInitialized({ myId, targetId });

  const myData = await getUserData(myId);
  const targetData = await getUserData(targetId);

  const getKey = push(myDbPath).key;

  const date = new Date();

  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const latestMessage = "none";

  const initTargetPath = await set(targetDbPath, {
    displayName: myData.displayName,
    targetId: myId,
    id: getKey,
    lastTime: `${getHours}:${getMinutes}`,
    latestMessage,
  });
  const initMyPath = await set(myDbPath, {
    displayName: targetData.displayName,
    targetId,
    id: getKey,
    lastTime: `${getHours}:${getMinutes}`,
    latestMessage,
  });

  await initialChatDatabase({
    myId,
    targetId,
    chatId: getKey,
    getHours,
    getMinutes,
    latestMessage,
  });

  return getKey;
};

const initialChatDatabase = async ({
  myId,
  targetId,
  chatId,
  getHours,
  getMinutes,
  latestMessage,
}) => {
  const myPath = child(rootReference, `chats/${chatId}/users/${myId}`);
  const targetPath = child(rootReference, `chats/${chatId}/users/${targetId}`);

  const myData = await getUserData(myId);
  const targetData = await getUserData(targetId);

  const myValue = {
    id: myId,
    displayName: myData.displayName,
    lastTime: `${getHours}:${getMinutes}`,
    latestMessage,
  };
  const targetValue = {
    id: targetId,
    displayName: targetData.displayName,
    lastTime: `${getHours}:${getMinutes}`,
    latestMessage,
  };

  await set(myPath, myValue);
  await set(targetPath, targetValue);
};

const getHighlightChat = async (id) => {
  const dbPath = child(rootReference, `users/${id}/chats`);
  const getValue = await get(dbPath);
  const objectValue = Object.values(getValue.val());
  return {
    error: false,
    message: "conversation is generated",
    data: objectValue,
  };
};

const checkIsChatExist = (id) => {
  return get(child(rootReference, `users/${id}/chats`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        getHighlightChat(id).catch(err);
      } else {
        return { error: true, message: "start the chat first", data: {} };
      }
    })
    .catch((err) => {
      return err;
    });
};

const sendMessage = async ({ chatId, myId, targetId, message }) => {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const lastTime = `${getHours}:${getMinutes}`;
  const latestMessage = message;

  await addMessageToChats({ message, chatId, myId, time: lastTime });

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
  const myObjectValue = Object.values(myValue)[0];
  const myNewData = {
    ...myObjectValue,
    lastTime,
    latestMessage,
  };

  // update target chat at users data
  const targetValue = await getUserChatData(targetId);
  const targetObjectValue = Object.values(targetValue)[0];
  const targetNewData = {
    ...targetObjectValue,
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

  await set(myPath, myNewData);
  await set(targetPath, targetNewData);
};

const addMessageToChats = async ({ message, chatId, myId, time }) => {
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
  };
  return await set(setPath, value);
};

const checkIsMessageExist = async ({ chatId, userId }) => {
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
  const dbPath = child(rootReference, `chats/${chatId}/users/${userId}/chats`);
  const dbGet = await get(dbPath);
  const value = dbGet.val();
  const objectValue = Object.values(value);
  return objectValue;
};

const flagChatHasInitialized = async ({ myId, targetId }) => {
  const myPath = child(rootReference, `users/${myId}/friendList/${targetId}`);
  const targetPath = child(
    rootReference,
    `users/${targetId}/friendList/${myId}`
  );

  const myDbGet = (await get(myPath)).val();
  const myNewData = {
    ...myDbGet,
    chat: "started",
  };

  const targetDbGet = (await get(targetPath)).val();
  const targetNewData = {
    ...targetDbGet,
    chat: "started",
  };

  await set(myPath, myNewData);
  await set(targetPath, targetNewData);
};

export {
  initialChatUserDatabase,
  getHighlightChat,
  checkIsChatExist,
  sendMessage,
  checkIsMessageExist,
  getChat,
};

import { get, set, child, getDatabase, ref, push } from "firebase/database";
import { getUserData } from "../user/user";
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
  checkIsMessageExist,
  getChat,
};

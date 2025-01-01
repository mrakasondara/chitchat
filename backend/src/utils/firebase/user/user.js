const { getAuth } = require("firebase/auth");
const { get, child, getDatabase, ref } = require("firebase/database");
const app = require("../firebase-sdk");

const auth = getAuth(app);
const database = getDatabase(app);
const rootReference = ref(database);

const getUserChatData = async (userId) => {
  const dbRef = child(rootReference, `users/${userId}/chats`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  return value;
};

const getChatUserData = async ({ chatId, userId }) => {
  const dbRef = child(rootReference, `chats/${chatId}/users/${userId}`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  return value;
};

const getTargetId = async ({ chatId, userId }) => {
  const dbRef = child(rootReference, `chats/${chatId}/users`);

  const dbGet = await get(dbRef);
  const value = dbGet.val();
  const objectValue = Object.values(value);
  const filtered = objectValue.filter((chat) => chat.id != userId);
  return filtered.id;
};

const getUserThumbData = async (userId) => {
  const dbRef = child(rootReference, `users/${userId}`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  return value.thumb;
};

module.exports = {
  getChatUserData,
  getUserChatData,
  getTargetId,
  getUserThumbData,
};

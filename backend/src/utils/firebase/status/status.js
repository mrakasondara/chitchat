const {
  get,
  set,
  child,
  getDatabase,
  ref,
  push,
} = require("firebase/database");
const app = require("../firebase-sdk");
const { addImageStatus, getImageFromStorage } = require("../storage");
const { getUserThumbData } = require("../user/user");

const database = getDatabase(app);
const rootReference = ref(database);

const addStatus = async ({ thumb, desc, uid, displayName }) => {
  const viewList = await getViewList(uid);
  const date = new Date();
  const dateExpire = new Date(date.getTime() + 24 * 60 * 60 * 1000);

  const dbRef = child(rootReference, `statuses/${uid}`);
  const getKey = push(dbRef).key;

  const data = {
    thumb: thumb ? `${uid}-${getKey}` : "none",
    desc,
    date: String(date),
    dateExpire: String(dateExpire),
    userId: uid,
    id: getKey,
    displayName,
  };
  if (thumb) {
    await addImageStatus({ thumb, name: data.thumb });
  }

  const setRef = child(rootReference, `statuses/${getKey}`);
  await set(setRef, data);
  if (viewList.length >= 1) {
    viewList.map(async (item) => {
      await addViewList({
        userId: item.id,
        displayName: item.displayName,
        statusId: getKey,
      });
    });
  }
};

const addViewList = async ({ userId, displayName, statusId }) => {
  const dbRef = child(rootReference, `statuses/${statusId}/viewList`);
  const getKey = push(dbRef).key;
  const thumb = await getUserThumbData(userId);
  const data = {
    id: getKey,
    userId,
    displayName,
    thumb,
    statusId,
  };
  const setRef = child(
    rootReference,
    `statuses/${statusId}/viewList/${getKey}`
  );
  await set(setRef, data);
};

const getViewList = async (uid) => {
  const isFriendListExist = await checkIsFriendListExist(uid);
  if (isFriendListExist) {
    const dbRef = child(rootReference, `users/${uid}/friendList`);
    const dbGet = await get(dbRef);
    const value = dbGet.val();
    const objectValue = Object.values(value);
    let viewList = [];
    objectValue.map((user) => {
      viewList.push({ id: user.id, displayName: user.displayName });
    });
    return viewList;
  } else {
    return [];
  }
};

const checkIsFriendListExist = async (uid) => {
  return get(child(rootReference, `users/${uid}/friendList`))
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

const getStatuses = async (userId) => {
  const filteredStatus = await getFilteredById(userId);
  const statusList = [];
  for (let index = 0; index < filteredStatus.length; index++) {
    try {
      const response = await fetchStatus(filteredStatus[index].statusId);
      const thumb = await getImageFromStorage(response.thumb);
      const data = {
        ...response,
        thumb,
      };
      statusList.push(data);
    } catch (error) {}
  }
  return statusList;
};

const fetchStatus = async (statusId) => {
  const dbRef = child(rootReference, `statuses/${statusId}`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  return value;
};

const getFilteredById = async (userId) => {
  const dbRef = child(rootReference, `statuses`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();

  // error
  const objectValue = Object.values(value);
  const item = objectValue.map((item) => {
    return Object.values(item.viewList);
  });
  const getViewList = item.map((view) => {
    let arr = [];
    view.map((item) => {
      return arr.push(item);
    });
    return arr;
  });

  const viewList = [];

  getViewList.forEach((item) => {
    return viewList.push(...item);
  });
  return viewList.filter((view) => view.userId == userId);
};

module.exports = { addStatus, getStatuses };

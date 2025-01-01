import {
  get,
  set,
  child,
  getDatabase,
  ref,
  push,
  remove,
} from "firebase/database";
import app from "../firebase-sdk";
import {
  addImageStatus,
  deleteImageFromStorage,
  getImageFromStorage,
} from "../storage";
import { getUserThumbData } from "../user/user";

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
  try {
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
      return { error: false, message: "Status Added" };
    }
  } catch (err) {
    return { error: true, message: "Something Error!" };
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
  if (!filteredStatus) {
    return false;
  } else {
    const statusList = [];
    for (const status of filteredStatus) {
      try {
        const response = await fetchStatus(status.statusId);
        const thumb =
          response.thumb == "none"
            ? "none"
            : await getImageFromStorage(response.thumb);
        const data = {
          ...response,
          thumb,
        };
        statusList.push(data);
      } catch (error) {
        return error;
      }
    }
    return { data: statusList };
  }
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
  if (value != null) {
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
  } else {
    return false;
  }
};

const checkIsStatusExpired = (statusDateExpire) => {
  const date = new Date();
  const dateStatus = new Date(statusDateExpire);
  if (date.getDate() != dateStatus.getDate()) {
    if (date.getHours() > dateStatus.getHours()) {
      return true;
    }
  } else {
    return false;
  }
};

const deleteExpiredStatus = async ({ userId, statusDateExpire, id }) => {
  if (checkIsStatusExpired(statusDateExpire)) {
    const dbPath = child(rootReference, `statuses/${id}`);
    const valuedbPath = await get(dbPath);
    const isExist = valuedbPath.val();
    if (!isExist) {
      return false;
    } else {
      remove(dbPath);
      deleteImageFromStorage({ userId, id });
    }
  }
};
export { addStatus, getStatuses, checkIsStatusExpired, deleteExpiredStatus };

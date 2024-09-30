/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { get, set, child, getDatabase, ref, remove } from "firebase/database";
import app from "../firebase-sdk";

const auth = getAuth(app);
const database = getDatabase(app);
const rootReference = ref(database);

const createUser = ({ email, password, displayName }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: displayName,
        photoURL: url,
      }).then((userCredential) => userCredential);
      return userCredential.user;
    })
    .catch((err) => {
      return err;
    });
};

const loginUser = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((err) => {
      return err;
    });
};

const addUserToDatabase = async ({ email, displayName, id }) => {
  const dbRef = child(rootReference, `users/${id}`);
  const friendCode = id.substring(0, 6);
  const result = { email, displayName, id, friendCode };
  const dbSet = await set(dbRef, result);
  return dbSet;
};

const logout = () => {
  signOut(auth);
};

const isUserExist = async (friendCode) => {
  const query = friendCode.substring(1, 7);
  const dbGet = await get(child(rootReference, "users"));
  const objectValue = Object.values(dbGet.val());
  const userCheckByFriendCode = objectValue.filter((val) => {
    return val.friendCode == query;
  });
  const length = userCheckByFriendCode.length;
  if (length) {
    const { id } = userCheckByFriendCode[0];
    return { length, id };
  } else {
    return { error: true };
  }
};

const addFriend = async ({ myId, targetId }) => {
  const getMyData = await getUserData(myId);
  const getTargetData = await getUserData(targetId);

  // data for targetId
  const myData = {
    id: myId,
    data: {
      id: targetId,
      displayName: getTargetData.displayName,
      status: "request",
      role: "sender",
    },
  };

  // data for myId
  const targetData = {
    id: targetId,
    data: {
      id: myId,
      displayName: getMyData.displayName,
      status: "request",
      role: "receiver",
    },
  };

  await updateUserFriendList({ id: myData.id, data: myData.data });

  return await updateUserFriendList({
    id: targetData.id,
    data: targetData.data,
  });
};

const updateUserFriendList = async ({ id, data }) => {
  const { objectValue } = await checkIsFriendListExist(id);

  switch (Boolean(objectValue)) {
    case true:
      const isAdded = await checkIsAdded({ myId: id, targetId: data.id });
      if (isAdded) {
        return { success: false, message: "User has been added previously!" };
      } else {
        const friendListPath = child(
          rootReference,
          `users/${id}/friendList/${data.id}`
        );
        const dbSet = await set(friendListPath, data);
        return { success: true, message: "User has been added!" };
      }

    default:
      const friendListPath = child(
        rootReference,
        `users/${id}/friendList/${data.id}`
      );
      const dbSet = await set(friendListPath, data);
      return { success: true, message: "User has been added!" };
  }
};

const checkIsFriendListExist = async (id) => {
  const ref = child(rootReference, `users/${id}/friendList`);
  const db = await get(ref);
  const value = db.val();
  const objectValue = value ? Object.values(value).length : 0;
  return { objectValue, ref };
};

const checkIsAdded = async ({ myId, targetId }) => {
  const ref = child(rootReference, `users/${myId}/friendList`);
  const dbGet = await get(ref);
  const value = dbGet.val();
  const objectValue = Object.values(value);
  const isExist = objectValue.filter((val) => val.id == targetId);
  return isExist.length;
};

const getFriendByStatus = async ({ id, status }) => {
  const dbRef = child(rootReference, `users/${id}/friendList`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  if (value) {
    const objectValue = Object.values(value);
    const filteredByStatus = objectValue.filter((item) => {
      return item.status == status;
    });
    if (status == "accept") {
      return filteredByStatus;
    } else {
      const filteredByRole = filteredByStatus.filter((item) => {
        return item.role == "receiver";
      });
      return filteredByRole;
    }
  }
  return value;
};

const getUserData = async (userId) => {
  const dbRef = child(rootReference, `users/${userId}`);
  const dbGet = await get(dbRef);
  const value = dbGet.val();
  return value;
};

const acceptRequest = async ({ myId, targetId }) => {
  // update myData
  const myDb = child(rootReference, `users/${myId}/friendList/${targetId}`);
  const myDbValue = await get(myDb);
  const myDbObjectValue = Object.values(myDbValue.val());
  const myNewData = {
    displayName: myDbObjectValue[0],
    id: myDbObjectValue[1],
    role: myDbObjectValue[2],
    status: "accept",
  };
  const updateMyData = await set(myDb, myNewData);

  // update targetData
  const targetDb = child(rootReference, `users/${targetId}/friendList/${myId}`);
  const targetDbValue = await get(targetDb);
  const targetDbObjectValue = Object.values(targetDbValue.val());
  const targetNewData = {
    displayName: targetDbObjectValue[0],
    id: targetDbObjectValue[1],
    role: targetDbObjectValue[2],
    status: "accept",
  };
  const updateTargetData = await set(targetDb, targetNewData);
  return { message: "User has been accepted" };
};

const rejectRequest = async ({ myId, targetId }) => {
  const myDbPath = child(rootReference, `users/${myId}/friendList/${targetId}`);
  const targetDbPath = child(
    rootReference,
    `users/${targetId}/friendList/${myId}`
  );
  remove(targetDbPath);
  remove(myDbPath);
  return { message: "User has been reject" };
};

export {
  createUser,
  loginUser,
  logout,
  addUserToDatabase,
  isUserExist,
  addFriend,
  getFriendByStatus,
  acceptRequest,
  rejectRequest,
};

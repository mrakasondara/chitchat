/* eslint-disable no-case-declarations */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { get, set, child, getDatabase, ref, push } from "firebase/database";
import app from "../firebase-sdk";

const auth = getAuth(app);
const database = getDatabase(app);
const rootReference = ref(database);

const createUser = ({ email, password, displayName }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: displayName,
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
  }
};

const addFriend = async ({ myId, targetId }) => {
  const myData = {
    id: myId,
    data: {
      id: targetId,
      status: "request",
    },
  };
  const targetData = {
    id: targetId,
    data: {
      id: myId,
      status: "request",
    },
  };

  await updateUserFriendList({ id: myData.id, data: myData.data });

  return await updateUserFriendList({
    id: targetData.id,
    data: targetData.data,
  });
};

const updateUserFriendList = async ({ id, data }) => {
  const { objectValue, ref } = await checkIsFriendListExist(id);

  switch (Boolean(objectValue)) {
    case true:
      const isAdded = await checkIsAdded({ myId: id, targetId: data.id });
      if (isAdded) {
        return { success: false, message: "User has been added previously!" };
      } else {
        const friendListId = push(ref).key;
        const friendListPath = child(
          rootReference,
          `users/${id}/friendList/${friendListId}`
        );
        const dbSet = await set(friendListPath, data);
        return { success: true, message: "User has been added!" };
      }

    default:
      const refFriendList = child(rootReference, `users/${id}/friendList`);
      const friendListId = push(refFriendList).key;
      const friendListPath = child(
        rootReference,
        `users/${id}/friendList/${friendListId}`
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

export {
  createUser,
  loginUser,
  logout,
  addUserToDatabase,
  isUserExist,
  addFriend,
};

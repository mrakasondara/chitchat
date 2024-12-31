import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import app from "./firebase-sdk";

const getImageFromStorage = async (uid) => {
  const storage = getStorage();
  const gsRef = ref(storage, `users/${uid}`);
  const getUrl = await getDownloadURL(gsRef).then((url) => {
    return url;
  });
  return getUrl;
};

const addImageToStorage = async (image, uid) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `users/${uid}`);

  return uploadBytes(storageRef, image).then((snapshot) => {
    getDownloadURL(snapshot.ref)
      .then((url) => {
        return { success: true, url };
      })
      .catch((err) => {
        return { success: false, err };
      });
  });
};
const addImageStatus = async ({ thumb, name }) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `users/${name}`);
  const blob = new Blob([thumb]);
  const metadata = {
    contentType: "image/jpeg",
  };
  return uploadBytes(storageRef, blob, metadata).then((snapshot) => {
    getDownloadURL(snapshot.ref)
      .then((url) => {
        return { success: true, url };
      })
      .catch((err) => {
        return { success: false, err };
      });
  });
};

const deleteImageFromStorage = async ({ userId, id }) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `users/${userId}-${id}`);

  await deleteObject(storageRef).then((res) => {
    return res;
  });
};

export {
  addImageToStorage,
  getImageFromStorage,
  addImageStatus,
  deleteImageFromStorage,
};

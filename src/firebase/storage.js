import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
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
export { addImageToStorage, getImageFromStorage };

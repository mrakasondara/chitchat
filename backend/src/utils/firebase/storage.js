const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");
const { Blob } = require("buffer");
const app = require("./firebase-sdk");

const getImageFromStorage = async (uid) => {
  const storage = getStorage();
  const gsRef = ref(storage, `users/${uid}`);
  const getUrl = await getDownloadURL(gsRef).then((url) => {
    return url;
  });
  return getUrl;
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
module.exports = { addImageStatus, getImageFromStorage };

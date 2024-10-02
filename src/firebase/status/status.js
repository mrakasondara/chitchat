import { get, set, child, getDatabase, ref, remove } from "firebase/database";
import app from "../firebase-sdk";
import { addImageToStorage } from "../storage";

const database = getDatabase(app);
const rootReference = ref(database);

const addStatus = async ({ thumb, desc, date, viewList }) => {
  const data = {
    desc,
    date,
    viewList: {
      ...viewList,
    },
  };
  const dbRef = child(rootReference, "statuses");
  const id = push(dbRef).key;
  const dbPath = child(rootReference, `statuses/${id}`);
  const result = { ...data, thumb: id, id };
  const { mimetype } = thumb;
  const dbSet = await set(dbPath, result);
  const name = id;
  await addImageToStorage(thumb);
};

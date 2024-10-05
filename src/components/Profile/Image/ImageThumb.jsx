import { useEffect } from "react";
import useInput from "../../../hooks/useInput";
import { getImageFromStorage } from "../../../firebase/storage";

const ImageThumb = ({ image, id, imageDb, setImageDb }) => {
  const [imagePath, onPathChange, setImagePath] = useInput();
  useEffect(() => {
    if (id) {
      if (image != "none" || image == undefined) {
        const fetchImage = async () => {
          const myImage = await getImageFromStorage(id);
          setImagePath(myImage);
        };
        fetchImage().catch();
      }
    }
  }, [image, imageDb]);
  return (
    <>
      {imageDb && (
        <img
          src={
            image == "none"
              ? "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              : imagePath
          }
          alt="profile image"
          className="mx-auto w-1/2"
        />
      )}
      {!imageDb && (
        <img
          src={
            image == "none"
              ? "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              : image
          }
          alt="profile image"
          className="mx-auto w-1/2"
        />
      )}
    </>
  );
};
export default ImageThumb;

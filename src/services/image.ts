import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import firebaseConfig from "../config/firebase";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImage = async (image: string, imageName: string) => {
  const imageRef = ref(storage, imageName);

  const img = await fetch(image);
  const bytes = await img.blob();

  const uploadedImage = await uploadBytes(imageRef, bytes);

  const bucket = uploadedImage.metadata.bucket;

  const url =
    "https://firebasestorage.googleapis.com/v0/b/" +
    bucket +
    "/o/" +
    imageRef.name +
    "?alt=media";

  return url;
};

export const deleteImage = async (imageName: string) => {
  const imageRef = ref(storage, imageName);
  await deleteObject(imageRef);
};

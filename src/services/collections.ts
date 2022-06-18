import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  doc,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";

import firebaseConfig from "../config/firebase";

export interface CreateCollection {
  name: string;
  description: string;
  imageUrl: string;
  imageName: string;
}

export interface Collection extends CreateCollection {
  id: string;
  userEmail: string;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateCollection = async (id: string, data: CreateCollection) => {
  const collectionDocRef = doc(db, "collections", id);
  await updateDoc(collectionDocRef, data as any);
};

export const addNewCollection = async (
  data: CreateCollection,
  userEmail: string
) => {
  await addDoc(collection(db, "collections"), { ...data, userEmail });
};

export const getCollections = async (
  userEmail: string
): Promise<Collection[]> => {
  const q = query(
    collection(db, "collections"),
    where("userEmail", "==", userEmail)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Collection[];
};

export const getCollectionById = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "collections", id));
  return querySnapshot.data();
};

export const deleteCollection = async (id: string) => {
  await deleteDoc(doc(db, "collections", id));
};

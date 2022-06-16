import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebase';

export interface CreateCard {
  front: string;
  back: string;
  collectionId: string;
}

export interface Card extends CreateCard {
  id: string;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateCard = async (id: string, data: CreateCard) => {
  const cardDocRef = doc(db, 'cards', id);
  await updateDoc(cardDocRef, data as any);
};

export const addNewCard = async (data: CreateCard) => {
  await addDoc(collection(db, 'cards'), { ...data });
};

export const getCards = async (collectionId: string): Promise<Card[]> => {
  const q = query(
    collection(db, 'cards'),
    where('collectionId', '==', collectionId)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Card[];
};

export const getCardById = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, 'cards', id));
  return querySnapshot.data();
};

export const deleteCard = async (id: string) => {
  await deleteDoc(doc(db, 'cards', id));
};

// src/services/itemsService.js
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const COLLECTION = "items"; // nombre de la colección

export const createItem = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getItem = async (id) => {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const updateItem = async (id, updatedData) => {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, updatedData);
};

export const deleteItem = async (id) => {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
};

// Subscripción en tiempo real (útil para listado)
export const subscribeToItems = (callback) => {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(items);
  });
};

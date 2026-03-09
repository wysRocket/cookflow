import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function loadUserAppData<T>(
  uid: string,
  key: string,
): Promise<T | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  const appData = data?.appData as Record<string, unknown> | undefined;
  if (!appData || !(key in appData)) return null;
  return appData[key] as T;
}

export async function saveUserAppData<T>(
  uid: string,
  key: string,
  value: T,
): Promise<void> {
  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      appData: {
        [key]: value,
      },
    },
    { merge: true },
  );
}

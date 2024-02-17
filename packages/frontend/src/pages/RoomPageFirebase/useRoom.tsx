import { useEffect, useState } from "react";
import { User } from "./models";
import { authenticate, db, disconnect } from "../../firebase/firebase";
import {
  doc,
  onSnapshot,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { EstimationOfPerson, getEstimations } from "../../types/Estimations";

export const useRoom = (roomId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [anonymousLogged, setAnonymousLogged] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<boolean>(false);
  const [usersAndEstimations, setUsersAndEstimations] = useState<
    EstimationOfPerson[]
  >([]);

  const joinRoom = async (userName: string) => {
    const user: User = {
      id: anonymousLogged,
      name: userName,
      roomId: roomId,
      estimation: "",
    };
    const usersCollectionRef = collection(db, "users");
    const q = query(
      usersCollectionRef,
      where("roomId", "==", roomId),
      where("userName", "==", userName)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty || !user.id) {
      setErrorUser(true);
    } else {
      const usersDocumentRef = doc(usersCollectionRef, user.id);
      await setDoc(usersDocumentRef, user);
      setUser({ ...user, id: user.id });
      setErrorUser(false);
    }
  };

  const addEstimation = async (estimation: string) => {
    if (!user || !user.id) {
      return;
    }
    const userRef = doc(db, "users", user.id);
    const userWithEstimation = { ...user, estimation };

    await updateDoc(userRef, userWithEstimation);
  };

  const removeUserFromRoom = async () => {
    if (!user || !user.id) {
      return;
    }
    const userRef = doc(db, "users", user.id);
    await deleteDoc(userRef);
  };

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("roomId", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const estimations: EstimationOfPerson[] = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;
        estimations.push({
          person: user.name,
          estimations: getEstimations(user.estimation),
        });
      });
      setUsersAndEstimations(estimations);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId, user]);

  useEffect(() => {
    window.addEventListener("beforeunload", removeUserFromRoom);

    return () => {
      window.removeEventListener("beforeunload", removeUserFromRoom);
    };
  }, [roomId, user]);

  useEffect(() => {

      authenticate().then((userId) => {
        if (userId) {
          
          setAnonymousLogged(userId);
        }
      });
    

    return () => {
      disconnect().then(()=>{
        setAnonymousLogged(null);

      });

    };
  }, []);

  return {
    user,
    errorUser,
    joinRoom,
    addEstimation,
    usersAndEstimations,
    anonymousLogged,
  };
};

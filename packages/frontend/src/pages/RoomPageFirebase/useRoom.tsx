import { useCallback, useEffect, useState } from "react";
import { User } from "./models";
import { db} from "../../firebase/firebase";
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
import { useAuthContext } from "../../contexts/AuthContext";
import { useLoadingDispatcherContext, useLoadingStateContext } from "../../contexts/LoadingContext";

export const useRoom = (roomId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersAndEstimations, setUsersAndEstimations] = useState<
    EstimationOfPerson[]
  >([]);
  const {anonymousLogged} = useAuthContext();
  const setLoading = useLoadingDispatcherContext();

  const joinRoom = useCallback(async (userName: string) => {
    setLoading(true);
    const newUser: User = {
      id: anonymousLogged,
      name: userName,
      roomId: roomId,
      estimation: "",
    };
    const userExistsInRoom = await userExists(userName);
    if (userExistsInRoom || !newUser.id) {
      console.log("User already exists");
    } else {
      const usersCollectionRef = collection(db, "users");
      const usersDocumentRef = doc(usersCollectionRef, newUser.id);
      await setDoc(usersDocumentRef, newUser);
      setUser({ ...newUser, id: newUser.id });
    }
    setLoading(false);
  }, [ roomId, anonymousLogged]);

  const userExists = async (userName: string) => {
    const usersCollectionRef = collection(db, "users");
    const q = query(
      usersCollectionRef,
      where("roomId", "==", roomId),
      where("name", "==", userName)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const addEstimation = useCallback(async (estimation: string) => {
    if (!user || !user.id) {
      return;
    }
    const userRef = doc(db, "users", user.id);
    const userWithEstimation = { ...user, estimation };
  
    await updateDoc(userRef, userWithEstimation);
  }, [user]);

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
    if (!user || !user.id) {
      return;
    }
    window.addEventListener("beforeunload", removeUserFromRoom);

    return () => {
      window.removeEventListener("beforeunload", removeUserFromRoom);
      removeUserFromRoom();
    };
  }, [roomId, user]);

  

  return {
    user,
    joinRoom,
    addEstimation,
    usersAndEstimations,
    userExists
  };
};

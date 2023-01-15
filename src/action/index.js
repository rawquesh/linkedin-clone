import db, { auth, provider, storage } from "../firebase";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES } from "./actionType";
import {
  addDoc,
  collection,
  query,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export function setUser(payload) {
  return {
    type: SET_USER,
    user: payload,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING_STATUS,
    status: status,
  };
}

export function getArticles(payload, id) {
  return {
    type: GET_ARTICLES,
    payload: payload,
    id: id,
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => dispatch(setUser(payload.user)))
      .catch((err) => alert(err.message));
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => dispatch(setUser(null)))
      .catch((err) => alert(err.message));
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      dispatch(setLoading(true));

      const storageRef = ref(storage, `images/${payload.image.name}`);

      const metadata = {
        contentType: payload.image.type,
      };

      const uploadTask = uploadBytesResumable(
        storageRef,
        payload.image,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => alert(err),
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            likes: {
              count: 0,
              whoLiked: [],
            },
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      dispatch(setLoading(true));
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });
      addDoc(collection(db, "articles"), {});
      dispatch(setLoading(false));
    } else if (payload.image === "" && payload.video === "") {
      dispatch(setLoading(true));
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      });

      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    dispatch(setLoading(true));
    let payload;
    let id;

    const q = query(collection("articles").orderBy("actor.date", "desc"));
    getDocs(q).then((snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      id = snapshot.docs.map((doc) => doc.id);
      dispatch(getArticles(payload, id));
    });

    dispatch(setLoading(false));
  };
}

export function updateArticleAPI(payload) {
  return (dispatch) => {
    updateDoc(collection(db, "articles"), payload.update);
  };
}

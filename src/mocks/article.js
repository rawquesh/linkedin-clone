import Firebase from "firebase";

const article = {
  likes: {
    whoLiked: ["slava2261812@gmail.com"],
    count: 1,
  },
  actor: {
    image:
      "https://lh3.googleusercontent.com/a/AEdFTp7J0pNt1rQjQUls3oDLWXWN58pLnZo00fP04uyY_A=s96-c",
    title: "slava sitnik",
    date: Firebase.firestore.Timestamp.now(),
    description: "slava2261812@gmail.com",
  },
  video: "",
  sharedImg:
    "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-39db1.appspot.com/o/images%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-01-11%20%D0%B2%2017.12.09.png?alt=media&token=98cc7059-bf21-403f-9836-87bfc5652a8e",
  comments: 0,
  description: "new post ",
};

export default article;

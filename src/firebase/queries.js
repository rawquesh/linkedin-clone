import db from "./index";

export const getArticleById = (id) => db.collection("articles").doc(id).get();

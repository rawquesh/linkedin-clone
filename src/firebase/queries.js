import db from "./index";

export const getArticleById = (id) =>
  db.collection("articles").where("id", "==", id).get();

import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import {
  ArticleContainer,
  Description,
  SharedActor,
  SharedImage,
  SocialActions,
  SocialCount,
} from "./styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Divider, Stack } from "@mui/material";
import { renderComment } from "../../utils/comments";
import Firebase from "firebase";
import db, { auth } from "../../firebase/index";
import MessageBox from "../MessageBox";
import comments from "../../mocks/comments";
import { connect } from "react-redux";
import toast from "react-hot-toast";

function Article({ article, onLikeClick, user, id, preview = false }) {
  const [commentsFromDB, setCommentsFromDB] = useState([]);

  useEffect(() => {
    if (!preview) {
      setCommentsFromDB(comments);
    }
  }, [preview]);

  const onPressSend = async (text) => {
    if (text.length === 0) return;

    db.collection("comments").add({
      dateCreated: Firebase.firestore.Timestamp.now(),
      likedBy: [],
      pinned: false,
      approved: false,
      content: text,
      // post: {
      //   id: article.id,
      //   title: article.title,
      //   category: article.categories[0],
      // },
      user: {
        id: auth.currentUser?.uid,
        name: auth.currentUser?.displayName ?? "Unknown",
        photo: auth.currentUser?.photoURL ?? "",
      },
      parentCommentId: "",
      parentUserId: auth.currentUser.uid,
    });
  };

  const onShareClick = () => {
    navigator.clipboard
      .writeText(`https://${process.env.REACT_APP_HOST}/post/${id}`)
      .then(
        () => {
          toast.success("Link copied to clipboard.", {
            position: "bottom-left",
          });
        },
        () => {
          toast.error("Failed to copy", { position: "bottom-left" });
        }
      );
  };

  return (
    <Box>
      <ArticleContainer>
        <SharedActor>
          <a>
            {article.actor.image ? (
              <img src={article.actor.image} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <div>
              <span>{article.actor.title}</span>
              <span>{article.actor.description}</span>
              <span>{article.actor.date.toDate().toLocaleDateString()}</span>
            </div>
          </a>
        </SharedActor>
        <Description>{article.description}</Description>
        {(article.sharedImg || article.video) && (
          <SharedImage>
            <a>
              {!article.sharedImg && article.video ? (
                <ReactPlayer width={"100%"} url={article.video} />
              ) : (
                article.sharedImg && <img src={article.sharedImg} alt="" />
              )}
            </a>
          </SharedImage>
        )}
        <SocialCount>
          {article.likes.count > 0 && (
            <>
              <li>
                <button>
                  <img
                    src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                    alt=""
                  />
                  <span>{article?.likes.count}</span>
                </button>
              </li>
              <li>
                <a>{article.comments} comments (currently not working)</a>
              </li>
            </>
          )}
        </SocialCount>
        {!preview && (
          <>
            <SocialActions>
              <button>
                <img src="/images/pray-icon.svg" alt="" />
                <span>Thanks</span>
              </button>
              <button
                onClick={(event) => onLikeClick(event, article, id)}
                style={{
                  color:
                    article.likes.whoLiked.indexOf(user.email) >= 0
                      ? "red"
                      : null,
                }}
              >
                <FavoriteBorderIcon />
                <span>Love</span>
              </button>
              <button onClick={onShareClick}>
                <img src="/images/share-icon.svg" alt="" />
                <span>Share</span>
              </button>
            </SocialActions>
            <Divider />
            <Box sx={{ padding: "12px" }}>
              {commentsFromDB.filter(
                (cfdb) =>
                  (Firebase.firestore.Timestamp.now() -
                    cfdb.data.dateCreated.seconds) /
                    60 >
                  30
              ).length > 0 && (
                <Stack gap={1} mb="12px">
                  {commentsFromDB.map((comment, _index) => {
                    return renderComment(
                      comment,
                      false,
                      false,
                      true,
                      null,
                      null,
                      null,
                      commentsFromDB.length - 1 === _index
                    );
                  })}
                </Stack>
              )}
              <MessageBox onClick={onPressSend} />
            </Box>
          </>
        )}
      </ArticleContainer>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Article);

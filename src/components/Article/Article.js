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
import { Box, Divider, Stack } from "@mui/material";
import { renderComment } from "../../utils/comments";
import Firebase from "firebase";
import db, { auth } from "../../firebase/index";
import MessageBox from "../MessageBox";
import comments from "../../mocks/comments";
import { connect } from "react-redux";

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
              <button
                onClick={(event) => onLikeClick(event, article, id)}
                className={
                  article.likes.whoLiked.indexOf(user.email) >= 0
                    ? "active"
                    : null
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="rgba(0, 0, 0, 0.6)"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                </svg>
                <span>Like</span>
              </button>
              <button>
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

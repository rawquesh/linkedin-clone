import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import styled from "styled-components";
import { remove as removeLodash } from "lodash";
import timeSince from "../../utils/timeSince";
import db, { auth } from "../../firebase";
import Firebase from "firebase";
import MessageBox from "../MessageBox";

/**
 * dateCreated: {timestampValue: "2022-12-30T10:16:35.398Z"}
 * likedBy: {arrayValue: {}}
 * message: {stringValue: "New Post with correct data"}
 * parentCommentId: {stringValue: ""}
 * postId: {stringValue: "CGp7EIeMkENDaVF5OVsg"}
 * userId: {stringValue: "nY63N7fKyjNcaOiLdnWaCV3bGiY2"}
 */

export function Comment({
  pinned = false,
  subcomment = false,
  viewThread = false,
  approved,
  user,
  content,
  likedBy,
  replies,
  id,
  parentCommentId,
  parentUserId,
  dateCreated,
  post,
  onPressPin,
  onPressUnPin,
  settings,
  showPin,
}) {
  const { name, photo } = user;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // ----------Reply Box
  const [replyBoxShow, setReplyBoxShow] = useState(false);

  const isLiked = likedBy?.includes(auth?.currentUser?.uid) ?? false;
  // ------------------

  const onPressReply = async (text) => {
    if (text.length === 0) return;

    db.collection("comments").add({
      dateCreated: Firebase.firestore.Timestamp.now(),
      likedBy: [],
      pinned: false,
      approved: false,
      content: text,
      post: {
        id: post.id,
      },
      user: {
        id: auth.currentUser?.uid,
        name: auth.currentUser?.displayName ?? "Unknown",
        photo: auth.currentUser?.photoURL ?? "",
      },
      parentCommentId: parentCommentId === "" ? id : parentCommentId,
      parentUserId: parentUserId,

      // so we can fetch replies for the user in /settings[replies]
    });
    setReplyBoxShow(false);
  };

  const onClickPin = async () => {
    onPressPin();
  };
  const onClickUnPin = async () => {
    onPressUnPin();
  };
  const onClickLike = async () => {
    // const sfDocRef = doc(db, "comments", id);

    // db.

    try {
      let newLikedby = [...likedBy];
      if (isLiked) {
        removeLodash(newLikedby, (e) => e == auth.currentUser.uid);
      } else {
        newLikedby.push(auth.currentUser.uid);
      }

      // await updateDoc(sfDocRef, { likedBy: newLikedby });

      db.collection("comments").doc(id).update({ likedBy: newLikedby });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  function onPressReplyCancel() {
    setReplyBoxShow(false);
  }

  return (
    <Box
      width={subcomment ? "calc(100% - 25px)" : "100%"}
      display="flex"
      gap={1}
      flexDirection="column"
      justifyContent="flex-end"
    >
      <Box
        marginLeft={subcomment ? "25px" : 0}
        width="100%"
        display="flex"
        gap={1}
      >
        <Avatar src={photo} />
        <Box width="100%" textAlign="start" display="flex">
          <Box width="100%">
            <Typography fontWeight={600} fontSize="13px">
              {name}
            </Typography>
            <Typography fontSize="15px">{content}</Typography>
            <Box
              width="100%"
              justifyContent="space-between"
              gap={1}
              display="flex"
            >
              <Box gap={1} display="flex">
                <Typography sx={{ color: "#626d7a" }} fontSize="12px">
                  {timeSince(dateCreated.toDate())}
                </Typography>
                <Typography
                  onClick={() => setReplyBoxShow((prevState) => !prevState)}
                  sx={{ cursor: "pointer", color: "#2a5885" }}
                  fontSize="12px"
                >
                  Reply
                </Typography>
              </Box>
              <Box alignItems="center" display="flex">
                <IconButton onClick={onClickLike} sx={{ padding: "5px" }}>
                  <FavoriteIcon sx={{ fontSize: "15px" }} />
                </IconButton>
                {likedBy.length > 0 && (
                  <Typography fontSize="12px">{likedBy.length}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {replyBoxShow && (
        <Box
          mb={2}
          width={!subcomment ? "calc(100% - 25px)" : "100%"}
          marginLeft="25px"
        >
          <MessageBox onClick={onPressReply} />
        </Box>
      )}
    </Box>
  );
}

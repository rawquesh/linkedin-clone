import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { useState } from "react";
import ReplyBox from "../ReplyBox";
// import { doc, Timestamp, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { remove as removeLodash } from "lodash";
import { DeleteForever, PushPin } from "@mui/icons-material";
import timeSince from "../../utils/timeSince";
import renderIcon from "../../utils/render-icon";
import db, { auth } from "../../firebase";

/**
 * dateCreated: {timestampValue: "2022-12-30T10:16:35.398Z"}
 * likedBy: {arrayValue: {}}
 * message: {stringValue: "New Post with correct data"}
 * parentCommentId: {stringValue: ""}
 * postId: {stringValue: "CGp7EIeMkENDaVF5OVsg"}
 * userId: {stringValue: "nY63N7fKyjNcaOiLdnWaCV3bGiY2"}
 */

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 18px 25px;
  outline: none;
  border-radius: 8px;
  text-transform: none;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 16px;

  :hover {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    opacity: 0.9;
  }

  ${({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  })}
`;

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
  const [ReplyBoxShow, setReplyBoxShow] = useState(false);
  const [ReplyText, setReplyText] = useState("");

  const isLiked = likedBy?.includes(auth?.currentUser?.uid) ?? false;
  // ------------------

  const onPressReply = async () => {
    if (ReplyText.length === 0) return;

    db.collection("comments").add({
      dateCreated: new Date(),
      likedBy: [],
      pinned: false,
      approved: false,
      content: ReplyText,
      post: {
        id: post.id,
        title: post.title,
        category: post.category,
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

      db.collection("comments").doc(id).update({ likedBy: newLikedby })

    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  function onPressReplyCancel() {
    setReplyBoxShow(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box gap={3} display="flex" alignItems="center" width={"100%"}>
        {subcomment && <Box>{renderIcon("reply_all", "secondary.main")}</Box>}
        <Box
          width="100%"
          p={3}
          boxSizing="border-box"
          borderRadius={viewThread ? 0 : 2}
          sx={{
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: pinned ? "#262626" : "transparent",
          }}
          color={pinned ? "#FFFFFF" : "inherit"}
          display="flex"
          gap={3}
        >
          {!matches && (
            <Box>
              <Avatar
                src={photo}
                alt=""
                sx={{ width: "55px", height: "55px" }}
              />
            </Box>
          )}
          <Box width="100%">
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              {matches ? (
                <Box>
                  <Avatar
                    src={photo}
                    alt=""
                    sx={{ width: "55px", height: "55px" }}
                  />
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5">{name}</Typography>
                  <Typography color="#959393" variant="body2">
                    {timeSince(dateCreated.toDate())}
                  </Typography>
                  {!approved && (
                    <Typography color="red" variant="body2">
                      Approval pending
                    </Typography>
                  )}
                </Box>
              )}

              {pinned ? (
                <Stack direction={"row"}>
                  <StyledButton
                    variant="outlined"
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                      borderRadius: 6,
                      paddingX: 4,
                      paddingY: 1,
                      display: "flex",
                      gap: 2,
                      alignSelf: "flex-start",
                    }}
                  >
                    {renderIcon("pin", "white")}
                    Pinned
                  </StyledButton>
                  {/* ABMTODO */}
                  <div
                    onClick={onClickUnPin}
                    style={{
                      height: "33pt",
                      width: "33pt",
                      border: "1px solid #B0915B",
                      borderRadius: "20pt",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "10pt",
                    }}
                  >
                    <DeleteForever />
                  </div>
                </Stack>
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                  gap={3}
                >
                  {!subcomment && !settings && showPin && (
                    <Typography
                      gap={1}
                      display="flex"
                      alignItems="center"
                      color="#959393"
                      variant="body2"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                        onClick={onClickPin}
                      >
                        <PushPin
                          color={"secondary"}
                          fontSize="small"
                          sx={{ mr: "3px" }}
                        />
                        Pin to top
                      </div>
                    </Typography>
                  )}
                  <Typography
                    gap={1}
                    display="flex"
                    alignItems="center"
                    color="#959393"
                    variant="body2"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={onClickLike}
                    >
                      <FavoriteIcon
                        color={isLiked ? "secondary" : "disabled"}
                        fontSize="small"
                        sx={{ mr: "3px" }}
                      />
                      {likedBy.length}
                    </div>
                  </Typography>
                  {!viewThread && (
                    <Typography
                      gap={1}
                      display="flex"
                      alignItems="center"
                      color="#959393"
                      variant="body2"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setReplyBoxShow(!ReplyBoxShow);
                        }}
                      >
                        <ReplyIcon fontSize="small" /> Reply
                      </div>
                    </Typography>
                  )}
                  {replies && (
                    <Typography color="#959393" variant="body2">
                      Replies ({replies})
                    </Typography>
                  )}
                  {viewThread && !matches && !subcomment && (
                    <Button
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 4,
                        gap: 1,
                        paddingY: 1,
                        paddingX: 3,
                        backgroundColor: "#BCBCBC",
                        color: "white",
                      }}
                    >
                      View in thread <ArrowRightAltIcon />
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
            {matches && (
              <Stack flexDirection="column" alignItems="start" gap={1} mb={2}>
                <Typography variant="h5">{name}</Typography>
                {!approved && (
                  <Typography color="red" variant="body2">
                    Approval pending
                  </Typography>
                )}
                <Typography color="#959393" variant="body2">
                  {timeSince(dateCreated.toDate())}
                </Typography>
              </Stack>
            )}
            <Typography variant="body1">{content}</Typography>
            {viewThread && matches && (
              <Button
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 4,
                  gap: 1,
                  paddingY: 1,
                  paddingX: 3,
                  backgroundColor: "#BCBCBC",
                  color: "white",
                }}
              >
                View in thread <ArrowRightAltIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {ReplyBoxShow && (
        <div style={{ marginTop: 20 }}>
          <ReplyBox
            onClick={onPressReply}
            onClickCancel={onPressReplyCancel}
            Text={ReplyText}
            setText={setReplyText}
            id={id}
          />
        </div>
      )}
    </div>
  );
}

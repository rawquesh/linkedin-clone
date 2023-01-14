import React from "react";
import { Stack } from "@mui/material";
import Comment from "../components/Comment";

export const renderComment = (
  comment,
  isSubcomment = false,
  viewThread = false,
  divider = true,
  parentcomment,
  onPressPin,
  onPressUnPin
) => {
  const hasSubcomments = comment?.data?.subcomments?.length > 0;

  const addToPinned = () => {
    if (onPressPin) {
      onPressPin();
    }
    return;
  };
  const addToUnPinned = () => {
    if (onPressUnPin) {
      onPressUnPin();
    }
    return;
  };

  if (!hasSubcomments) {
    return (
      <Comment
        subcomment={isSubcomment}
        {...comment.data}
        id={comment.id}
        viewThread={false}
        onPressPin={() => {
          addToPinned();
        }}
        onPressUnPin={() => {
          addToUnPinned();
        }}
        settings={comment.settings}
        showPin={false}
      />
    );
  }

  let subcomments = [...comment.data.subcomments];

  subcomments.sort(
    (a, b) => a.data.dateCreated.toDate() - b.data.dateCreated.toDate()
  );

  return (
    <Stack flexDirection="column" width="100%" gap={3}>
      <Comment
        {...comment.data}
        id={comment.id}
        viewThread={viewThread}
        onPressPin={() => {
          addToPinned();
        }}
        onPressUnPin={() => {
          addToUnPinned();
        }}
        settings={comment.settings}
        showPin={false}
      />
      {subcomments.map((subcomment) => (
        <Stack
          boxSizing="border-box"
          // width="100%"
          // flexDirection="row"
          justifyContent="flex-end"
        >
          {renderComment(
            (comment = subcomment),
            true,
            (parentcomment = comment)
          )}
        </Stack>
      ))}
    </Stack>
  );
};

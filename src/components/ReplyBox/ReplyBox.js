import React, { useState } from "react";
import styled from "styled-components";
import { Box, Button, Stack, useTheme } from "@mui/material";
import renderIcon from "../../utils/render-icon";

const StyledTextArea = styled("textarea")`
  padding: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  outline: none;
  border: none;
  resize: none;

  &::placeholder {
    color: #959393;
  }
`;

const Container = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > textarea {
    flex: 1;
    height: 200px;
  }

  > button {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }
`;

export function ReplyBox({ onClick, onClickCancel }) {
  const [text, setText] = useState("");

  const theme = useTheme();
  return (
    <Container>
      <StyledTextArea
        placeholder="Start typing..."
        rows={1}
        style={{ fontSize: "medium" }}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Stack
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
        direction="row"
      >
        <Button
          onClick={() => {
            if (onClick) {
              onClickCancel();
            }
          }}
          sx={{
            backgroundColor: "grey",
            color: "white",
            paddingX: 3,
            paddingY: 1,
            display: "flex",
            gap: 2,
            mr: "10px",
          }}
          variant="contained"
        >
          Close
          {renderIcon("close", "white")}
        </Button>
        <Button
          onClick={() => {
            if (onClick) {
              onClick(text);
            }
          }}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            paddingX: 3,
            paddingY: 1,
            display: "flex",
            gap: 2,
          }}
          variant="contained"
        >
          Reply
          {renderIcon("send", "white")}
        </Button>
      </Stack>
    </Container>
  );
}

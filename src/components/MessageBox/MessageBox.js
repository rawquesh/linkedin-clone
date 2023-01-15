import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { Container, StyledTextArea } from "./style";
import renderIcon from "../../utils/render-icon";

export function MessageBox({ onClick }) {
  const theme = useTheme();

  const [text, setText] = useState("");

  return (
    <Container>
      <StyledTextArea
        placeholder="Start typing..."
        style={{ fontSize: "medium" }}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
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
        Send
        {renderIcon("send", "white")}
      </Button>
    </Container>
  );
}

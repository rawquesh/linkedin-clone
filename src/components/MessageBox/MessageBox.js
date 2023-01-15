import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Container, StyledTextArea } from "./style";
import renderIcon from "../../utils/render-icon";

export function MessageBox({ onClick }) {
  const [text, setText] = useState("");

  return (
    <Container>
      <StyledTextArea
        placeholder="Start typing..."
        style={{ fontSize: "medium" }}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          event.target.style.height = "auto";
          event.target.style.height = event.target.scrollHeight - 10 + "px";
        }}
      />
      <IconButton
        onClick={() => {
          if (onClick) {
            onClick(text);
            setText("");
          }
        }}
      >
        {renderIcon("send", "black")}
      </IconButton>
    </Container>
  );
}

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledTextArea = styled("textarea")`
  padding: 5px 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  outline: none;
  border: none;
  resize: none;

  &::placeholder {
    color: #959393;
  }
`;

export const Container = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  gap: 10px;

  > textarea {
    flex: 1;
    height: 30px;
  }
`;

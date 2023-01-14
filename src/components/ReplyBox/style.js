import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import { FONT_PRIMARY } from "@/styles/theme/typography"

export const StyledTextArea = styled("textarea")`
  padding: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  outline: none;
  border: none;
  resize: none;

  &::placeholder {
    color: #959393;
    font-family: ${FONT_PRIMARY};
  }
`

export const Container = styled(Box)`
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
`

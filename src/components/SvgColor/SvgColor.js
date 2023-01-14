import { forwardRef } from "react"
import { Box } from "@mui/material"

export const SvgColor = forwardRef(({ src, sx, color, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 16,
      height: 16,
      display: "inline-block",
      backgroundColor: color ?? "grey",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
))

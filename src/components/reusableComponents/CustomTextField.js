// File: CustomTextField.js

import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(
  ({ theme, inputColor = "white", bgColor = "none", borderColor = "none", hoverBorderColor = "#777", focusedBorderColor = "#ddd", focusedLabelColor = "#ddd", labelColor = "#999" }) => ({
    "& label": {
        color: labelColor,
        backgroundColor: "transparent", // Remove label background
        border: "none", // Remove label border
        
    },
    "& input": {
            border: "1px solid #777;", // Override global input border
            boxShadow: "none", // Remove any potential input shadow
        },
    "& label.Mui-focused": {
        color: focusedLabelColor,
    },
    "& .MuiOutlinedInput-root": {
        color: inputColor,
        backgroundColor: bgColor,
        "& fieldset": {
            borderColor: borderColor,
            border: "none",  // Removes the border entirely for all input types

        },
        "&:hover fieldset": {
            borderColor: hoverBorderColor,
        },
        "&.Mui-focused fieldset": {
            borderColor: focusedBorderColor,
        },
    },
  })
);

export default CustomTextField;

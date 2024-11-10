// File: CustomListItem.js
import { ListItem, styled } from "@mui/material";

const CustomListItem = styled(ListItem)(
  ({ 
    textColor = "white", 
    bgColor = "none", 
    hoverBgColor = "#4e44ce", 
    borderRadius = "15px",
    hoverBorderRadius = "10px", 
    padding = "10px" 
  }) => ({
    color: textColor,
    backgroundColor: bgColor,
    padding: padding,
    borderRadius: borderRadius,
    "&:hover": {
        backgroundColor: hoverBgColor,
    },
  })
);

export default CustomListItem;

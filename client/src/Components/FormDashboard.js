import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Form from "./Form";
import CloseIcon from "@mui/icons-material/Close";
export default function FormDashboard() {
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display={{ xs: "block", md: "none" }}>
      <IconButton onClick={handleClick}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translate(-50%,0%)",
          zIndex: 1000,
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: open ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: "4%", right: "6%" }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ color: "white", fontSize: "3rem" }} />
        </IconButton>
        <Form show="block" />
      </Box>
    </Box>
  );
}

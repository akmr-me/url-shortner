import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import Message from "./Message";
import Instance from "../axios/axiosInstance";
import FormDashboard from "./FormDashboard";
import { UserState } from "../context";
import "./header.css";

export default function Header() {
  const { userState, userDispatcher, setSession } = UserState();

  const handleLogout = async () => {
    try {
      const res = await Instance.get("/logout");
      setSession({});
      res.status === 204 && userDispatcher({ type: "USER", payload: {} });
    } catch (error) {
      let serverError = error?.response?.data?.message || error.message;
      userDispatcher({ type: "SERVER_ERROR", payload: serverError });
      console.error("Error During Logout: ", serverError);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#090d00",
        color: "rgba(255, 255, 255, 0.25)",
        fontSize: { md: "large", xs: "small", sm: "medium" },
        userSelect: "none",
      }}
    >
      {/* TODO: Make Message field coommon at on Place */}
      {userState?.message && <Message message={userState?.message} />}
      {userState?.error && <Message error={userState?.error} />}
      <Toolbar
        className="toolbar-root"
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          minHeight: { xs: "35px", sm: "45px", md: "54px" },
        }}
      >
        <div className="wrapper">
          <Typography
            className="logo"
            sx={{ fontSize: { md: "2em", sm: "xx-large", xs: "large" } }}
          >
            ✂️
          </Typography>
          <div>
            <p>
              <span> URL shortner</span>
              &mdash; Trim Your URL &mdash;
            </p>
          </div>
        </div>
        {!userState?.user?.email && <FormDashboard />}
        {userState?.user?.email && (
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              color="whitesmoke"
              mr="4px"
              sx={{
                textTransform: "none",
                opacity: "0.8",
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
            >
              {userState?.user?.email}
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleLogout}
              sx={{
                color: "white",
                margin: 0,
                ml: { xs: "0px !important", sm: "16px" },
              }}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

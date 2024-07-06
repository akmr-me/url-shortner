import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import URLField from "./URLField";
import { UserState } from "../context";
import URLTable from "./URLTable";
import Message from "./Message";
import Form from "./Form";

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ccc",
}));

const Content = () => {
  const { userState } = UserState();

  return (
    <Box
      sx={{
        alignContent: "center",
        width: { xs: "98%", md: "92%", lg: "80%" },
        padding: { xs: "10px 0px", md: "10px 20px", lg: "10px 40px" },
      }}
    >
      <Message />
      <Grid container spacing={4}>
        <Grid item height="90vh" md={!userState?.user?.email ? 7 : 12} xs={12}>
          <MyPaper
            sx={{
              flexDirection: "column",
              padding: { xs: "8px", sm: "8px 20px" },
              justifyContent: "space-around",
            }}
          >
            <URLField />
            <URLTable />
          </MyPaper>
        </Grid>
        {!userState?.user?.email && <Form show="none" />}
      </Grid>
    </Box>
  );
};

export default Content;

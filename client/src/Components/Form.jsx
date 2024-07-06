import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { lazy, Suspense, useState } from "react";
import AuthTabs from "./Authentication/AuthTabs";
import PasswordProvider from "../context/passwordContext";
const ResetPassword = lazy(() => import("./Authentication/ResetPassword"));

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ccc",
}));

const Form = ({ show }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <Grid
      item
      md={5}
      sx={{
        display: {
          xs: show,
          md: "block",
          ...(show !== "none" ? { maxWidth: "411px" } : {}),
        },
        margin: { xs: "10px", md: "0px" },
      }}
    >
      <MyPaper>
        {toggle ? (
          <AuthTabs setToggle={setToggle} />
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <PasswordProvider>
              <ResetPassword setToggle={setToggle} />
            </PasswordProvider>
          </Suspense>
        )}
      </MyPaper>
    </Grid>
  );
};
export default Form;

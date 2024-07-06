import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Instance from "../../../axios/axiosInstance";
import { PasswordState } from "../../../context/passwordContext";
import { checkEmail } from "../../../utils/checkCredential";
import Message from "../../Message";

const ForgotPassword = ({ setToggle }) => {
  const { dispatch } = PasswordState();
  const [err, setErr] = useState();
  const [email, setEmail] = useState();

  const handleForgotPassword = async (e) => {
    if (!checkEmail(email)) {
      setErr("Please Enter Valid Email Id");
      return;
    }
    try {
      const res = await Instance.post("/forgotPassword", { email: email });
      dispatch({
        type: "FORGOT_PASSWORD_SUCCESS",
        payload: { message: res.data.message, email: email },
      });
    } catch (error) {
      setErr(error?.response?.data || error.message);
      console.error(error.response.data);
    }
  };

  const handleCancle = () => {
    setToggle(true);
  };

  return (
    <Stack
      spacing={3}
      width="95%"
      height="60%"
      component={Paper}
      justifyContent="center"
      padding="10px 20px"
    >
      <Message error={err} />
      <Typography variant="h5" color="secondary">
        Forgot Password
      </Typography>
      <TextField
        type="email"
        label="Enter Email Address"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoFocus
        autoComplete="off"
        onChange={(e) => {
          setEmail(e.target.value);
          setErr("");
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          color="warning"
          variant="contained"
          sx={{ flex: 1, opacity: 0.9 }}
          onClick={handleCancle}
        >
          Cancle
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{ flex: 2 }}
          onClick={handleForgotPassword}
        >
          Search You Email
        </Button>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;

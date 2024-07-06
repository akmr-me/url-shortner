import { Paper, Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { PasswordState } from "../../../context/passwordContext";
import useAxios from "../../../hooks/useAxios";
import { checkPassword } from "../../../utils/checkCredential";
import Message from "../../Message";

const GeneratePassword = () => {
  const { passwordState } = PasswordState();
  const [err, setErr] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, ServerError, Fetch] = useAxios();

  const handleGeneratePassword = async () => {
    if (!checkPassword(password)) {
      setErr(
        "Minimum 8 character, atleat one uppercase, lowercase and special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErr("Password Did't Match");
      return;
    }
    try {
      await Fetch({
        url: "/generatePassword",
        method: "POST",
        requestConfig: {
          email: passwordState.email,
          password: password,
          otp: passwordState.otp,
        },
      });
    } catch (error) {
      //TODO some stuff are missing
      setErr(ServerError);
      console.error(error.response);
    }
  };

  return (
    <Stack
      spacing={3}
      width="95%"
      height="60%"
      component={Paper}
      justifyContent="center"
      padding="10px 20px"
      sx={{ opacity: loading ? "0.5" : "1" }}
    >
      <Message error={ServerError?.response?.data} />

      <Typography variant="h5" color="secondary">
        Generate Password
      </Typography>
      <TextField
        type="password"
        label="New Password"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoFocus
        autoComplete="off"
        onChange={(e) => {
          setPassword(e.target.value);
          setErr("");
          return;
        }}
      />
      <TextField
        type="password"
        label="Confirm New Password"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoComplete="off"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setErr("");
          return;
        }}
      />

      <Button
        color="secondary"
        variant="contained"
        onClick={handleGeneratePassword}
        disabled={!!err || !password || !confirmPassword}
      >
        Generate Password
      </Button>
    </Stack>
  );
};

export default GeneratePassword;

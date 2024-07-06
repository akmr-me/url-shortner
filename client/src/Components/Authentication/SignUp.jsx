import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Adornment from "./Adornment";
import useAxios from "../../hooks/useAxios";
import { checkEmail, checkPassword } from "../../utils/checkCredential";
import { UserState } from "../../context";
import { useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const SignUp = ({ setValue, setToggle }) => {
  const { storage } = UserState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [loading, ServerError, Fetch] = useAxios();

  useEffect(() => {
    if (ServerError) {
      setErrEmail(ServerError);
      setErrPassword(ServerError);
    }
  }, [ServerError]);

  const resetError = () => {
    setErrPassword("");
    setErrPassword("");
    setErrConfirmPassword("");
  };

  const handleEmailCheck = (e) => {
    if (!checkEmail(email)) {
      email && setErrEmail("Please Enter Valid Email Id");
    }
  };

  const handlePasswordCheck = () => {
    if (!checkPassword(password)) {
      password &&
        setErrPassword(
          "Minimum 8 character, atleat one uppercase, lowercase and special character"
        );
    }
  };
  const handleConfirmPassword = (e) => {
    setErrConfirmPassword("");
    if (!errPassword && password === e.target.value) {
      setConfirmPassword(() => e.target.value);
      return;
    }
    setErrConfirmPassword(
      e.target.value && (errPassword || "Password Did't Match")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Fetch({
      url: "/register",
      method: "POST",
      requestConfig: {
        email: email,
        password: password,
        rememberMe: rememberMe,
        urls: storage.map((item) => item.short),
      },
    });
  };
  const handleChange = (e) => {
    setRememberMe(e.target.checked);
  };
  return (
    <Box
      className="auth"
      sx={{
        display: "flex",
        alignItem: "center",
        flexDirection: "column",
        opacity: loading ? "0.4" : "1",
        cursor: loading && "wait",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: "black" }}>
        🔐
      </Typography>
      <Typography component="h5" varient="h5">
        SignUp
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          className="text-field"
          required
          label="Enter Email"
          type="email"
          fullWidth
          error={!!errEmail}
          variant="standard"
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrEmail("");
          }}
          onBlur={handleEmailCheck}
          helperText={errEmail}
          autoComplete="off"
        />
        <TextField
          className="text-field"
          required
          fullWidth
          label="Enter Password"
          type="password"
          variant="standard"
          placeholder="Enter Password"
          sx={{ mt: { xs: 1, sm: 2 } }}
          error={!!errPassword}
          onChange={(e) => {
            setPassword(e.target.value);
            resetError();
          }}
          helperText={
            errPassword ||
            "Atleast one lowercase, number, uppercase, among @$!%*?&"
          }
          onBlur={handlePasswordCheck}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Adornment password={password} />
              </InputAdornment>
            ),
          }}
          autoComplete="off"
        />
        <TextField
          className="text-field"
          required
          fullWidth
          autoComplete="off"
          // error={!!errConfirmPassword}
          label="Confirm Password"
          type="password"
          variant="standard"
          placeholder="Confirm Password"
          sx={{ mt: { xs: 1, sm: 2 } }}
          onChange={handleConfirmPassword}
          helperText={errConfirmPassword}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="secondary"
              onChange={handleChange}
            />
          }
          label="Remember me"
          sx={{ display: "flex" }}
        />
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          disabled={
            !!errConfirmPassword ||
            !!errPassword ||
            !!errEmail ||
            !email ||
            !password ||
            !confirmPassword ||
            loading
          } //this prop take only Boolean
          sx={{ mb: "2px" }}
        >
          {!loading ? "SignUp" : "Loading..."}
        </Button>

        <Grid container>
          <Grid item xs sx={{ display: "flex" }}>
            <Button
              size="small"
              sx={{
                padding: 0,
                margin: 0,
                fontSize: "10px",
              }}
              onClick={() => setToggle(false)}
            >
              Forgot Password
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              sx={{
                padding: 0,
                margin: 0,
                fontSize: "10px",
              }}
              onClick={() => setValue(0)}
            >
              Already Have an account? Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;

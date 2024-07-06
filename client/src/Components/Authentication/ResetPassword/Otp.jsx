import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Instance from "../../../axios/axiosInstance";
import { PasswordState } from "../../../context/passwordContext";
import Message from "../../Message";

const Otp = () => {
  const { passwordState, dispatch } = PasswordState();

  const [err, setErr] = useState();
  const [msg, setMsg] = useState();
  const [otp, setOtp] = useState();

  const [controller, setController] = useState();

  const handleSendOtp = async () => {
    if (otp < 1000 || otp > 9999) {
      setErr("Not valid OTP");
      return;
    }
    try {
      const res = await Instance.post("/otp", {
        otp: otp,
        email: passwordState.email,
      });
      if (res.status === 204) {
        // setDisplay(3);
        dispatch({ type: "OTP_SUCCESS", payload: otp });
        return;
      }
    } catch (error) {
      setErr(error?.response?.data || error.message);
      console.error("error from otp", error.response);
    }
  };

  const handleResend = async () => {
    const cntrl = new AbortController();
    setController(cntrl);
    try {
      const res = await Instance.post("/forgotPassword", {
        email: passwordState.email,
        signal: cntrl.signal,
      });
      setMsg(res.data.message && `A new OTP is send to ${passwordState.email}`);
    } catch (error) {
      setErr(error?.response?.data || error.message);
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    return () => {
      // setErr("");
      return controller && controller.abort();
    };
  }, [controller]);

  return (
    <Stack
      spacing={3}
      width="95%"
      height="60%"
      component={Paper}
      justifyContent="center"
      padding="10px 20px"
    >
      <Message error={err} message={msg || passwordState.message} />

      <Typography variant="h5" color="secondary">
        Please Enter 4 Digit OTP
      </Typography>
      <Typography variant="body2">
        {err || msg || passwordState.message}
      </Typography>
      <TextField
        type="number"
        label="Enter Otp"
        helperText={err && err}
        required
        error={!!err}
        autoComplete="off"
        fullWidth
        autoFocus
        inputProps={{ inputMode: "numeric", pattern: "[0-9]{4,}" }}
        onChange={(e) => {
          setOtp(e.target.value);
          setErr("");
          return;
        }}
      />

      <Button
        color="secondary"
        variant="contained"
        onClick={handleSendOtp}
        disabled={!!err || otp?.length !== 4}
      >
        Validate
      </Button>
      <Typography variant="subtitle2">
        Didn't got OTP?{" "}
        <Button size="small" onClick={handleResend}>
          resend
        </Button>
      </Typography>
    </Stack>
  );
};

export default Otp;

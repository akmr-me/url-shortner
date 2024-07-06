import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionDown(props) {
  return <Slide {...props} direction="up" />;
}

// --------------------------------------------------------------------
export default function Message({ error, message }) {
  const [open, setOpen] = React.useState(true);
  const [displayErr, setDisplayErr] = React.useState();
  const [displayMessage, setDisplayMessage] = React.useState();

  React.useEffect(() => {
    setOpen(true);
    setDisplayMessage(message);
  }, [message]);
  React.useEffect(() => {
    setOpen(true);
    setDisplayErr(error);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setDisplayErr("");
    setDisplayMessage("");
  };

  return (
    <Snackbar
      open={open && (!!displayErr || !!displayMessage)}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={TransitionDown}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={error ? "error" : "success"}
        sx={{ width: { md: "50vw", xl: "30vw" } }}
      >
        {error || message}
      </Alert>
    </Snackbar>
  );
}

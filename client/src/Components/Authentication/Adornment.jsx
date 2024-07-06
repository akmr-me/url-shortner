import Typography from "@mui/material/Typography";

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const validity = (password) => {
  return passwordRegEx.test(password);
};

const Adornment = ({ password }) => {
  if (!validity(password) && password.length > 0) {
    return (
      <Typography fontSize="11px" variant="subtitle2">
        Invalid
      </Typography>
    );
  }

  if (validity(password) && password.length < 12) {
    return (
      <Typography fontSize="11px" variant="subtitle2">
        Weak
      </Typography>
    );
  } else if (validity(password) && password.length >= 12) {
    return (
      <Typography fontSize="11px" variant="subtitle2" color="green">
        Strong
      </Typography>
    );
  }
};

export default Adornment;

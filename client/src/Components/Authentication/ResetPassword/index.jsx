import { lazy } from "react";
import { PasswordState } from "../../../context/passwordContext";
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const GeneratePassword = lazy(() => import("./GeneratePassword"));
const Otp = lazy(() => import("./Otp"));

const ResetPassword = ({ setToggle }) => {
  const { passwordState } = PasswordState();

  if (passwordState.display === 1) {
    return <ForgotPassword setToggle={setToggle} />;
  }
  if (passwordState.display === 2) {
    return <Otp />;
  }
  if (passwordState.display === 3) {
    return <GeneratePassword />;
  }

  return <p>Something wrong happaned Please refresh! </p>;
};

export default ResetPassword;

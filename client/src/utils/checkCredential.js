function checkEmail(email) {
  const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return emailRegEx.test(email);
}

function checkPassword(password) {
  // Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special characte
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegEx.test(password);
}
export { checkEmail, checkPassword };

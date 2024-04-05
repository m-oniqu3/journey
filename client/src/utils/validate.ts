export function validateEmail(email: string) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  //if password is less than 6 characters
  if (password !== "" && password.length < 6) {
    return false;
  }

  //if password is empty
  else if (password === "" || password.length === 0) return false;

  //if all fields are valid
  return true;
}

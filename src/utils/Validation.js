export default function validateInput(name, value, passwordValue) {
  const min_length = 2;
  const min_password_length = 6;
  let error = "";
  switch (name) {
    case "name":
      if (value.trim().length < min_length) {
        error = "Name must be at least 2 characters";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Name cannot contain numbers or special characters";
      }
      break;

    case "email":
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        error = "Invalid email format";
      }

      break;

    case "password":
      if (value.length < min_password_length) {
        error = "Password must be at least 6 characters";
      }

      break;

    case "retype_password":
      if (value !== passwordValue) {
        error = "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return error;
}

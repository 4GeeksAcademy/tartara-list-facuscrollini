import API_URL from "./apiUrl";

export const createAccount = async (user_name, email, password) => {
  const response = await fetch(API_URL + "user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: user_name,
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (response.status != 200) {

    if (data.error == "already exist a user with provided user_name or email") {
      return "Username and Email already exists.";
    } 
    else if (data.error == "already exist a user with provided user_name") {
      return "Username already exists.";
    } 
    else if (data.error == "already exist a user with provided email") {
      return "Email already exists.";
    }
  } else {
    return "done";
  }
};

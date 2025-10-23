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

export const fetchGetAllUsers = async() =>{

  try {
    const response = await fetch(`${API_URL}users`)

    let data;

    if(response.ok){
      try {
        data = await response.json()
      } catch (error) {
        throw new Error("Fetch has sended an invalid JSON Format response")
        
      }
    }

    return data;


  } catch (error) {
    throw new Error({error: error.message})
  }

}


export const fetchGetUser = async(user_id) =>{
  try {
    const response = await fetch(`${API_URL}user/?user_id=${user_id}`)

    
    if(!response.ok){
      throw new Error(response.statusText)
    }else{

      try {
        const data = response.json()
        return data
      } catch (error) {
        throw new Error("Fetch has sended an invalid JSON response")
      }
      
      
    }
  } catch (error) {
    return {error: error.message}
  }
}


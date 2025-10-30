import { useActionData } from "react-router-dom";
import API_URL from "./apiUrl";

const FETCH_URL = `${API_URL}user/friendship`;

export const saveFriendships = async (dispatch, user_id) => {
  await dispatch({ type: "loading" });
  const friendships = await fetchFriendship({ user_id: user_id }, "GET");

  if(!friendships.error){
  
    dispatch({ type: "save_friendships", payload: friendships.friendships});
    await dispatch({ type: "loading" });
  }
};

//Funcion que hace fetch a cada solicitud

//method puede ser: "GET", "POST", "PATCH", "DELETE"

export const fetchFriendship = async (fetchData, method) => {
  const optionsObject =
    method == "GET"
      ? {
          method
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchData),
        };

  try {
    const response = await fetch(
      //El primer ternario evalua si el metodo es GET, y si viene un "user_id" en fetchData
      //Esto es para saber si cuando se solicita este fetch se busca una relacion de amistad entre dos usuarios
      //O todas las amistades de un usuario especifico
      `${FETCH_URL}${
        method == "GET" && fetchData.user_id
          ? `s?user_id=${fetchData.user_id}`
          : `?to_id=${fetchData.user_to_id}&user_from_id=${fetchData.user_from_id}`
      }`,
      optionsObject
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Fetch has sended an invalid JSON response");
    }

    if (!response.ok) {
      const message = data?.error;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    return {error}
  }
};

export const fetchGetFriendshipsRequest = async (user_id, direction) => {
  try {
    const response = await fetch(
      `${API_URL}user/friendship/requests/?user_id=${user_id}&direction=${direction}`
    );

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Fetch has sended an invalid JSON response");
    }
    if (!response.ok) {
      const message = data?.error;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const saveRequestsFrom = async (user_id, dispatch, loading) => {
  loading();
  const fetchRequestsFrom = await fetchGetFriendshipsRequest(user_id, "from");

  if (fetchRequestsFrom.error) {
    console.log(fetchRequestsFrom);
  } else {
    dispatch({ type: "save_requests_from", payload: fetchRequestsFrom });
  }
  loading();
};

export const saveRequestsTo = async (user_id, dispatch, loading) => {
  loading();
  const fetchRequestsTo = await fetchGetFriendshipsRequest(user_id, "to");

  if (fetchRequestsTo.error) {
    console.log(fetchRequestsTo);
  } else {
    dispatch({ type: "save_requests_to", payload: fetchRequestsTo });
  }
  loading();
};

const fetchChangeRequestState = async (fetchData) => {
  try {
    const response = await fetch(`${API_URL}user/friendship/request/state`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    });

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Fetch has sended an invalid JSON response");
    }
    if (!response.ok) {
      const message = data?.error;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const changeRequestState = async(
  user_id,
  request_id,
  state,
  dispatch,
  loading
) => {
  loading();

  const fetchData = {
    user_id,
    state,
    friendship_request_id: request_id,
  };

  const fetchRequest = await fetchChangeRequestState(fetchData);

  console.log(fetchRequest)

  if (fetchRequest.error) {
    console.log(fetchRequest);
    return
  } 
  if(fetchRequest.message){
    dispatch({ type: "delete_request", payload: request_id });
  }else if(fetchRequest.id){
    dispatch({ type: "delete_request", payload: request_id });
    dispatch({type: "add_friendship", payload: fetchRequest})

  }
  

  loading();
};

export const fetchSendRequest = async(fetchData)=>{

try {
    const response = await fetch(`${API_URL}user/friendship/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    });

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Fetch has sended an invalid JSON response");
    }
    if (!response.ok) {
      const message = data?.error;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const sendRequest = async(user_to_id, user_from_id, user_name_to,dispatch,loading) => {

  const fetchData = {
    user_to_id: user_to_id,
    user_from_id: user_from_id
  }


  loading()

  const fetchRequest = await fetchSendRequest(fetchData)

  if(fetchRequest.error){
    console.log(fetchRequest)
    return
  }

  console.log(fetchRequest)

  const friendship_request_id = fetchRequest.id

  const to = fetchRequest.to

  const payload = {
    friendship_request_id,
    to
  }

  dispatch({type:"send_request", payload})


  console.log(fetchRequest)

  console.log(fetchRequest)
  loading()
}


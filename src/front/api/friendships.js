import API_URL from "./apiUrl";

const FETCH_URL = `${API_URL}user/friendship`;




 export const saveFriendships = async (dispatch) => {

        await dispatch({ type: "loading" })
        const friendships = await fetchFriendship({ user_id: 2 }, "GET")
        dispatch({ type: "save_friendships", payload: friendships.friendships })
        await dispatch({ type: "loading" })

    }





//Funcion que hace fetch a cada solicitud

//method puede ser: "GET", "POST", "PATCH", "DELETE"


export const fetchFriendship = async (fetchData, method) => {
  const optionsObject =
    method == "GET"
      ? {
          method: method,
        }
      : {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchData),
        };

  try {
    const response = await fetch(
      `${FETCH_URL}${
        method == "GET" && fetchData.user_id
          ? `s?user_id=${fetchData.user_id}`
          : `to_id=${fetchData.user_to_id}?user_from_id=${fetchData.user_from_id}`
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
    console.log({ error: error });
  }
};
